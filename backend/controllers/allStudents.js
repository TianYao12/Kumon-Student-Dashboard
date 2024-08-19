const Student = require('../schemas/StudentSchema')

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        return res.json(students);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const addAllStudent = async (req, res) => { 
    const { firstName, lastName, qrId, subject } = req.body;
    try {
        const student = await Student.create({FirstName: firstName, LastName: lastName, qrId: qrId, Subject: subject });
        if (!student) throw new Error(student);
        return res.status(200).json(student);
    } catch (error) {
        console.error(error);
    }
}

const updateAllStudent = async (req, res) => {
    const { firstName, lastName, qrId, subject } = req.body;
    try {
        const student = await Student.findOneAndUpdate(
            { qrId: qrId }, 
            { 
                firstName: firstName, 
                lastName: lastName, 
                subject: subject 
            }, 
            { new: true } 
        );
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        return res.status(200).json(student);
    } catch (error) {
        return res.status(500).json({ message: "Error updating student", error });
    }
};

const deleteAllStudent = async (req, res) => {
    const id = req.body.id;
    await Student.deleteOne({ qrID: id });
    return res.status(200).json("Student deleted");
}

module.exports = {
    getAllStudents,
    addAllStudent,
    updateAllStudent,
    deleteAllStudent
};