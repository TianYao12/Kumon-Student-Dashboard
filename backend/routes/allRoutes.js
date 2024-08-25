const express = require('express');
const { getAllStudents, addAllStudent, updateAllStudent, deleteAllStudent } = require('../controllers/allStudents');

const router = express.Router();

router.get('/get_all_students', getAllStudents);
router.post('/add_all_student/', addAllStudent);
router.put('/update_all_student/', updateAllStudent);
router.delete('/delete_all_student/', deleteAllStudent);

module.exports = router;
