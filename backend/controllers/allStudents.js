const Student = require('../schemas/StudentSchema')

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}).select('-_id');
        return res.status(200).json({students: students});
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const addAllStudent = async (req, res) => { 
    const { firstName, lastName, qrID, subject } = req.body;
    try {
        const allUserAlreadyExists = await Student.exists({ FirstName: firstName, LastName: lastName, Subject: subject });
        if (allUserAlreadyExists) return res.status(409).json({error: "User already exists"});
        const student = await Student.create({FirstName: firstName, LastName: lastName, qrID: qrID, Subject: subject });
        if (!student) throw new Error(student);
        return res.status(200).json({student: student});
    } catch (error) {
        console.error(error);
    }
}

const updateAllStudent = async (req, res) => {
    const { firstName, lastName, qrID, subject } = req.body;
    try {
        const student = await Student.findOneAndUpdate(
            { qrID: qrID }, 
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
    const { qrID, subject } = req.body;
    const student = await Student.deleteOne({qrID: qrID, Subject: subject})
    if (!student) {
        res.status(404).json({"error":"Student not found"})
    }
    return res.status(200).json("Student deleted");
}

module.exports = {
    getAllStudents,
    addAllStudent,
    updateAllStudent,
    deleteAllStudent
};