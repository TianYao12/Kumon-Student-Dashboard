const express = require('express');
const router = express.Router();

router.get('/get_all_students', (req, res) => {

})

router.get('/get_all_current_students', (req, res) => { // Hetul

})

router.post('/add_student/:id', (req, res) => { // Tian

})

router.post('/add_current_student/:id', (req, res) => { // Hetul

})

router.put('/update_student/:id', (req, res) => { // Tian

})

router.put('/update_current_student/:id', (req, res) => { // Hadi
    const studentId = req.params.id;
})

router.delete('/delete_student/:id', (req, res) => { // Hadi

})

router.delete('/delete_current_student/:id', (req, res) => {

})

module.exports = router;


