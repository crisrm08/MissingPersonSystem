const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pg = require('pg');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

require('dotenv').config();
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

// Ruta para recibir imagen, subirla a Cloudinary y guardar la URL en PostgreSQL
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

app.post("/search", upload.single("image"), async (req, res) => {
    typedName = req.body.name;
    typedId = req.body.id;
    typedLastSeen = req.body.lastSeen;
    uploadedImage = req.file;

    try {
        const result = await db.query("SELECT * FROM missing_persons WHERE name ILIKE $1 OR id = $2 OR last_seen ILIKE $3",
            [typedName + '%', typedId, '%' + typedLastSeen + '%']);
        console.log(result.rows[0]);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));