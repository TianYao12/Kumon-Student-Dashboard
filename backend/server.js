const express = require('express');
const mongoose = require('./connect_mongo');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Student = require('./schemas/StudentSchema');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, broskui hello owrlkduy7!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));