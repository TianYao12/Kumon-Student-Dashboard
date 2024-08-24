const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    qrID: { type: String, unique: true, required: true },
    Subject: { type: String, required: true }
  }, { collection: 'Students' });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;