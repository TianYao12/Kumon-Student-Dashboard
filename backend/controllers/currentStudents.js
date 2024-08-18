const mongoose = require('../mongo/connect_mongo');
const Student = require('../schemas/CurrentStudentSchema');
const AllStudents = require('../schemas/StudentSchema');

const getCurrentStudents = async (req, res) => { 
    try {
        const students = await Student.findAll();
        return res.json(students);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const addCurrentStudent = async (req, res) => { // Hetul
    try {
        const id = req.body.id;
        const student = await AllStudents.findOne({ qrID: id });
        const newStudent = new Student({
            FirstName: student.FirstName,
            LastName: student.LastName,
            qrID: student.qrID,
            Subject: student.Subject,
        });
        await newStudent.save();
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
    const id = req.body.id;
    add_current_students(id);
    return "Current Student added";
}

const updateCurrentStudent = async (req, res) => { // Hadi
    const id = req.body.id;
    update_current_student(id);
    return "Current Student updated";
}

const deleteCurrentStudent = async (req, res) => {
    const id = req.body.id;
    delete_current_student(id);
    return "Current Student deleted";
}

export { getCurrentStudents, addCurrentStudent, updateCurrentStudent, deleteCurrentStudent };