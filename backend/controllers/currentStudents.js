const mongoose = require('../mongo/connect_mongo');
const CurrentStudent = require('../schemas/CurrentStudentSchema');
const AllStudents = require('../schemas/StudentSchema');

const getCurrentStudents = async (req, res) => { 
    try {
        const students = await CurrentStudent.findAll();
        return res.json({ students: students });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const addCurrentStudent = async (req, res) => {
    try {
        const id = req.body.id;
        const student = await AllStudents.findOne({ qrID: id });
        console.log(student)
        if(!student){
            return res.status(404).json({"Response":"Student not found"})
        }
        const newStudent = new CurrentStudent({
            FirstName: student.FirstName,
            LastName: student.LastName,
            qrID: student.qrID,
            Subject: student.Subject
        });
        console.log(newStudent)
        await newStudent.save();
        return res.status(200).json({"Response":"Student added"})
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
    
}

const updateCurrentStudent = async (req, res) => {
    const {qrID, firstName, lastName, subject} = req.body;
    let student = await CurrentStudent.findOne({qrID:qrID});
    if(!student){
        res.status(404).json({"Response":"Student not found"});
    }
    const updatedStudent = await CurrentStudent.findOneAndUpdate(
        { qrID: qrID  },
        { FirstName: firstName, LastName: lastName, Subject: subject },
        { new: true }
    )
   return res.status(200).json({"Response":updatedStudent});
}

const deleteCurrentStudent = async (req, res) => {
    try {
        const id = req.body.id;
        await Student.deleteOne({ qrID: id });
        return res.json({ success: "success" });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = 
    { 
        getCurrentStudents, 
        addCurrentStudent, 
        updateCurrentStudent, 
        deleteCurrentStudent 
    };