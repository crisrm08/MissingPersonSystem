import express from 'express'; 
import cors from 'cors';
import axios from 'axios';
import pg from 'pg';
import multer from 'multer';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import * as faceapi from 'face-api.js';
import canvas from 'canvas';
//import '@tensorflow/tfjs-node';
import path from 'path';
import { fileURLToPath } from 'url';
import { match } from 'assert';

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MODEL_PATH = path.join(__dirname, "models");


async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
}

async function imageToTensor(buffer) {
    const img = await canvas.loadImage(buffer);
    const resizedImage = faceapi.resizeResults(img, { width: 150, height: 150 }); 
    return await faceapi.detectSingleFace(resizedImage)
                        .withFaceLandmarks()
                        .withFaceDescriptor();
}


async function downloadImageAsTensor(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    return await imageToTensor(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error("Error al descargar la imagen:", error);
    return null;
  }
}

async function compareFaces(tensor1, tensor2) {
    if (!tensor1 || !tensor2) return 1; 

    const distance = faceapi.euclideanDistance(tensor1.descriptor, tensor2.descriptor);
    console.log("🔍 Distancia Euclidiana:", distance);

    return distance < 0.5; 
}


loadModels().then(() => {
  console.log("Modelos cargados exitosamente.");
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
});

// Ruta para recibir imagen, subirla a Cloudinary y guardar la URL en PostgreSQL.
app.post("/save", upload.single("image"), async (req, res) => {
    try {
        console.log(req.body.name, req.body.id, req.body.lastSeen);
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        cloudinary.uploader.upload_stream(
            { folder: "missing_persons" }, 
            async (error, result) => {
                if (error) {
                    console.error("Error al subir imagen:", error);
                    return res.status(500).json({ error: "Image upload failed" });
                }

                console.log("Imagen subida:", result.secure_url); 

                const { name, id, lastSeen } = req.body;
                try {
                    const dbResult = await db.query(
                        "INSERT INTO missing_persons (name, id, last_seen, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
                        [name, id, lastSeen, result.secure_url]
                    );

                    res.json({ message: "Data saved", data: dbResult.rows[0] });
                } catch (dbError) {
                    console.error("Error al insertar en PostgreSQL:", dbError);
                    res.status(500).json({ error: "Database error" });
                }
            }
        ).end(req.file.buffer); 
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Ruta para comparar la persona subida con los desaparecidos registrados.
app.post("/search", upload.single("image"), async (req, res) => {
    const typedName = req.body.name;
    const typedId = req.body.id;
    const typedLastSeen = req.body.lastSeen;
    const uploadedImage = req.file;

    try {
        // 🔹 1. Buscar coincidencias de nombre, ID o último lugar
        const result = await db.query(
            "SELECT * FROM missing_persons WHERE name ILIKE $1 OR id = $2 OR last_seen ILIKE $3",
            [typedName + '%', typedId, '%' + typedLastSeen + '%']
        );

        let matches = result.rows; // Personas que coinciden en nombre/ID/última ubicación
        console.log(matches);

        let bestMatch = null;
        let highestConfidence = 0;
        let uploadedImageUrl = null;

        // 🔹 2. Si el usuario subió una imagen, comparar con las imágenes almacenadas
        if (uploadedImage) {
            uploadedImageUrl = `data:${uploadedImage.mimetype};base64,${uploadedImage.buffer.toString("base64")}`;
            const uploadedTensor = await imageToTensor(uploadedImage.buffer); // Convierte la imagen subida en un tensor

            for (let person of matches) {
                const cloudinaryImageUrl = person.image_url; // URL de la imagen en Cloudinary

                // Descargar la imagen de Cloudinary y convertirla en un tensor
                const storedTensor = await downloadImageAsTensor(cloudinaryImageUrl);

                // Comparar embeddings faciales
                const similarity = await compareFaces(uploadedTensor, storedTensor);
                person.matchConfidence = similarity; // Guardar el nivel de similitud

                if (similarity > highestConfidence) {
                    highestConfidence = similarity;
                    bestMatch = { ...person, uploadedImageUrl }; // Agregar la imagen subida al mejor match
                }
            }
        }

        // 🔹 3. Enviar solo el mejor match si existe
        if (bestMatch) {
            console.log(bestMatch);
            res.json({ bestMatch });
        } else {
            res.json({ message: "No se encontraron coincidencias con la imagen.", results: matches, uploadedImageUrl });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en la búsqueda" });
    }
});


