const CurrentStudent = require('../schemas/CurrentStudentSchema');

const getCurrentStudents = async (req, res) => { 
    try {
        const students = await CurrentStudent.find({});
        console.log(students)
        return res.json({ students: students });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const addCurrentStudent = async (req, res) => {
    try {
        const {qrID} = req.body;
        const student = await AllStudents.findOne({ qrID: qrID });
        console.log(student)
        if (!student){
            return res.status(404).json({"Response":"Student not found"})
        }
        const newStudent = await CurrentStudent.create({
            FirstName: student.FirstName,
            LastName: student.LastName,
            qrID: student.qrID,
            Subject: student.Subject
        });
        return res.status(200).json({"response":"Student added"})
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
    
}

const updateCurrentStudent = async (req, res) => {
    const {qrID, firstName, lastName, subject} = req.body;
    let student = await CurrentStudent.findOne({qrID:qrID});
    if (!student){
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
    const { qrID, subject } = req.body;
    console.log(req.body)
    try {
        const student = await CurrentStudent.deleteOne({qrID: qrID, Subject: subject})
        if (!student) {
            res.status(404).json({"error":"Student not found"})
        }
        return res.status(200).json("Student deleted");
    } catch(error) {
        console.error(error)
        res.status(400).json({"error": "An error occured."})
    }
}

module.exports = 
    { 
        getCurrentStudents, 
        addCurrentStudent, 
        updateCurrentStudent, 
        deleteCurrentStudent 
    };