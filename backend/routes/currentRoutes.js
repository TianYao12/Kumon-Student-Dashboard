const { getCurrentStudents, addCurrentStudent, updateCurrentStudent, deleteCurrentStudent } = require('../controllers/currentStudents');

const express = require('express');
const router = express.Router();

router.get('/get_current_students', getCurrentStudents);
router.post('/add_current_student/', addCurrentStudent);
router.put('/update_current_student/', updateCurrentStudent);
router.delete('/delete_current_student/', deleteCurrentStudent);

module.exports = router;