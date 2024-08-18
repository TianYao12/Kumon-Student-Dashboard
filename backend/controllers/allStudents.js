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

const deleteAllStudent = async (req, res) => { // Hadi
    const id = req.body.id;
    delete_student(id);
    return "Student deleted";
}

export { getAllStudents, addAllStudent, updateAllStudent, deleteAllStudent };