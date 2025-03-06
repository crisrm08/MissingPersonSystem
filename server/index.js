const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pg = require('pg');
const multer = require('multer')

require('dotenv').config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
app.post("/search", upload.single("image"), (req, res) => {
    console.log(req.body.name);
    console.log(req.body.id);
    console.log(req.body.lastSeen);
    console.log(req.file); 

    res.send({ message: "Datos recibidos correctamente" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));