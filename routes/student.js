const express = require('express')
const router = express.Router()

const {protect} =require('../middleware/auth')

const {register,login,add,remove,favrt} = require('../controllers/student')

router.post('/student/register',register)
router.post('/student/login',login)
router.post('/student/add/:Id',protect,add)
router.post('/student/remove/:Id',protect,remove)


router.get('/favrt',favrt)

module.exports = router
