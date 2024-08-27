const express = require('express');
const { getCurrentStudents, addOrDeleteCurrentStudent, updateCurrentStudent, deleteCurrentStudent } = require('../controllers/currentStudents');

const router = express.Router();

router.get('/get_current_students', getCurrentStudents);
router.post('/add_or_delete_current_student/', addOrDeleteCurrentStudent);
router.put('/update_current_student/', updateCurrentStudent);
router.delete('/delete_current_student/', deleteCurrentStudent);

module.exports = router;