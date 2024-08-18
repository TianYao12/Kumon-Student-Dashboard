const express = require('express');
const router = express.Router();

router.get('/get_all_students', (req, res) => {
    students = get_all_students();
    return res.json(students);
})

router.get('/get_all_current_students', (req, res) => { // Hetul
    students = get_all_current_students();
    return res.json(students);
})

router.post('/add_student/', (req, res) => { // Tian
    const id = req.body.id;
    add_students(id);
    return "Student added";
})

router.post('/add_current_student/', (req, res) => { // Hetul
    const id = req.body.id;
    add_current_students(id);
    return "Current Student added";
})

router.put('/update_student/', (req, res) => { // Tian
    const id = req.body.id;
    update_student(id);
    return "Student updated";
})

router.put('/update_current_student/', (req, res) => { // Hadi
    const id = req.body.id;
    update_current_student(id);
    return "Current Student updated";
})

<<<<<<< HEAD
router.put('/update_current_student/:id', (req, res) => { // Hadi
    const studentId = req.params.id;
=======
router.delete('/delete_student/', (req, res) => { // Hadi
    const id = req.body.id;
    delete_student(id);
    return "Student deleted";
})

router.delete('/delete_current_student/', (req, res) => {
    const id = req.body.id;
    delete_current_student(id);
    return "Current Student deleted";
})

module.exports = router;


