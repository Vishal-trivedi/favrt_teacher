const express = require('express')
const router = express.Router()



const {register,login} = require('../controllers/teacher')

router.post('/teacher/register',register)
router.post('/teacher/login',login)


module.exports = router

