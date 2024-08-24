const mongoose = require('mongoose')

const currentStudentSchema = new mongoose.Schema({
    FirstName:{ type: String, required: true },
    LastName:{ type: String, required: true },
    qrID: { type: String, unique: true, required: true },
    Subject: { type: String, required: true },
}, { timestamps: true, 
    collection: 'CurrentStudents' 
  });

const CurrentStudent = mongoose.model('CurrentStudent', currentStudentSchema);
module.exports = CurrentStudent;