const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./mongo/connect_mongo');
const studentAllRoutes = require('./routes/allRoutes');
const studentCurrentRoutes = require('./routes/currentRoutes');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/all", studentAllRoutes);
app.use("/api/current", studentCurrentRoutes);

app.get('/', (req, res) => {
  res.send('Hello, broskui hello owrlkduy7!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));