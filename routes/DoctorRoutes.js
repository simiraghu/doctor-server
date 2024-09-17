const router = require('express').Router()
const Create_doctor = require('../controllers/Doctor/Create_doctor')
const Get_all_doctors = require('../controllers/Doctor/Get_all_doctors')
const Get_doctor_by_id = require('../controllers/Doctor/Get_doctor_by_id')
const Delete_doctor = require('../controllers/Doctor/Delete_doctor')
const Update_doctor = require('../controllers/Doctor/Update_doctor')
const auth = require('../middleware/auth')

router.post('/create_doctor', auth, Create_doctor)
router.get('/get_all_doctors', Get_all_doctors)
router.get('/get_doctor_by_id', Get_doctor_by_id)
router.put('/delete_doctor', Delete_doctor)
router.put('/update_doctor', Update_doctor)

module.exports = router