const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pg = require('pg');
require('dotenv').config();
const app = express();
const PORT = 5000;

//cambio
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));