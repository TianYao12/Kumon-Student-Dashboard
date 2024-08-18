const express = require('express');
const router = express.Router();

router.get('/get_all_students', (req, res) => {

})

router.get('/get_all_current_students', (req, res) => { // Hetul
    
})

router.post('/add_student/', (req, res) => { // Tian

})

router.post('/add_current_student/', (req, res) => { // Hetul

})

router.put('/update_student/', (req, res) => { // Tian

})

router.put('/update_current_student/', (req, res) => { // Hadi

})

<<<<<<< HEAD
router.put('/update_current_student/:id', (req, res) => { // Hadi
    const studentId = req.params.id;
=======
router.delete('/delete_student/', (req, res) => { // Hadi

>>>>>>> 0dac2cf729fed92993e3971e5c583ccbf1cb87a6
})

router.delete('/delete_current_student/', (req, res) => {

})

module.exports = router;


