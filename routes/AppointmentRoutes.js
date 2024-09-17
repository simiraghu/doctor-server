const router = require('express').Router()
const Create_appointment = require('../controllers/Appointment/Create_appointment')
const Create_appointment_with_aggregate = require('../controllers/Appointment/Create_appoinment_with_aggregate')
const auth = require('../middleware/auth')
const Get_appointments_by_userId = require('../controllers/Appointment/Get_appointments_by_userId')
const Get_all_appointments = require('../controllers/Appointment/Get_all_appointmets')
const Update_appointments = require('../controllers/Appointment/Update_appointment')
const Delete_appointments = require('../controllers/Appointment/Delete_appointments')
const Get_appointment_by_id = require('../controllers/Appointment/Get_appointment_by_id')

router.post('/create_appointment', auth, Create_appointment)
router.post('/create_a_w_a', auth, Create_appointment_with_aggregate)
router.get('/get_appointments_by_userId', auth, Get_appointments_by_userId)
router.get('/get_all_appointments', auth, Get_all_appointments)
router.put('/update_appointments',auth, Update_appointments)
router.put('/delete_appointments', Delete_appointments)
router.get('/get_appointment_by_id', Get_appointment_by_id)

module.exports = router