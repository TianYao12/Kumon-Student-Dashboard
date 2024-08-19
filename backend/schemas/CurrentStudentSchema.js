const mongoose = require('mongoose')

const currentStudentSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    qrID: { type: String, unique: true, required: true },
    Subject: String
}, {timestamps: true, 
    collection: 'CurrentStudents' 
  });

const CurrentStudent = mongoose.model('CurrentStudent', currentStudentSchema);
module.exports = CurrentStudent;