const getCurrentStudents = async (req, res) => { // Hetul
    students = get_all_current_students();
    return res.json(students);
}

const addCurrentStudent = async (req, res) => { // Hetul
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