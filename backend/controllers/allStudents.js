const mongoose = require('../mongo/connect_mongo')
const Student = require('../schemas/StudentSchema')

const getAllStudents = async (req, res) => {
    students = get_all_students();
    return res.json(students);
}

const addAllStudent = async (req, res) => { // Tian
    const id = req.body.id;
    add_students(id);
    return "Student added";
}

const updateAllStudent = async (req, res) => { // Tian
    const id = req.body.id;
    update_student(id);
    return "Student updated";
}

const deleteAllStudent = async (req, res) => {
    console.log("Delete All Student Reached")
    const id = req.body.id;
    await Student.deleteOne({ qrID: id });
    return res.json("Student deleted");
}

module.exports = {
    getAllStudents,
    addAllStudent,
    updateAllStudent,
    deleteAllStudent
};