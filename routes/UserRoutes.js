const router = require('express').Router()
const Create_user = require('../controllers/User/Create_user');
const Get_admin = require('../controllers/User/Get_admin');
const Login_user = require('../controllers/User/Login_user');

router.post('/create_user', Create_user)
router.post('/login_user', Login_user)
router.get('/get_admin', Get_admin)

module.exports = router