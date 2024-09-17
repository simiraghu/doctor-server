const router = require('express').Router()
const DoctorRoutes = require('../routes/DoctorRoutes');
const UserRoutes = require('../routes/UserRoutes');
const AppointmentRoutes = require('../routes/AppointmentRoutes');

router.use('/doctor', DoctorRoutes);
router.use('/user', UserRoutes);
router.use('/appointment', AppointmentRoutes);

module.exports = router