const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pg = require('pg');
require('dotenv').config();
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.post("/search", async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.id);
    console.log(req.body.lastSeen);
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));