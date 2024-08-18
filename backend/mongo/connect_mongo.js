const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbURI = process.env.MONGO_URI;
if (!dbURI) console.log("Wrong Mongo URI"); 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
