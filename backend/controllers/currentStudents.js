const mongoose = require('../mongo/connect_mongo');
const CurrentStudent = require('../schemas/CurrentStudentSchema');
const AllStudents = require('../schemas/StudentSchema');

const getCurrentStudents = async (req, res) => { 
    try {
        const students = await CurrentStudent.findAll();
        return res.json(students);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const addCurrentStudent = async (req, res) => { // Hetul
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
    const {qrId, firstName, lastName, subject} = req.body;
    let student = await CurrentStudent.findOne({qrID:qrId});
    if(!student){
        res.status(404).json({"Response":"Student not found"});
    }
    const updatedStudent = await CurrentStudent.findOneAndUpdate(
        { qrID: qrId  },
        { FirstName: firstName, LastName: lastName, Subject: subject },
        { new: true }
    )
   return res.status(200).json({"Response":updatedStudent});
}

const deleteCurrentStudent = async (req, res) => {
    const id = req.body.id;
    delete_current_student(id);
    return "Current Student deleted";
}

module.exports = 
    { 
        getCurrentStudents, 
        addCurrentStudent, 
        updateCurrentStudent, 
        deleteCurrentStudent 
    };