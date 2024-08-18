const mongoose = require('mongoose')

const currentStudentSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    qrID: String,
    Subject: String,
    EnterTime: Date
  }, {timestamps: true, 
    collection: 'CurrentStudents' 
  });

const Student = mongoose.model('Student', currentStudentSchema);
module.exports = Student;