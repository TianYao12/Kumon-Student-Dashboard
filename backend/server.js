const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const routes = require('./routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const studentSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  qrID: String,
  Subject: String
}, { collection: 'Students' }); 

const Student = mongoose.model('Student', studentSchema);

app.get("/data_filter", async (req, res) => {
  console.log("Reached Endpoint");

  try {
    const students = await Student.find({});
    console.log(students);

    for (let student of students) {
      console.log(student.FirstName);
      student.FirstName = student.FirstName.slice(0, 2); 
      await student.save();
    }

    console.log("Loop over");
    res.send('Data filtered');
  } catch (error) {
    console.error("Error processing data", error);
    res.status(500).send('Error filtering data');
  }
});