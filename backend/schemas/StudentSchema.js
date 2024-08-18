const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    qrID: String,
    Subject: String
  }, { collection: 'Students' });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;