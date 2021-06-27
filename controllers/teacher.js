const JWT = require('jsonwebtoken')
const Teacher = require("../models/Teacher")

const asyncHandler = require('../middleware/asyn')


exports.register =asyncHandler(async (req,res,next) =>{
    const {name,email,password,phone,subject} = req.body

    const tech = await Teacher.findOne({email:email})

    if(tech){
        return res.json({sucess:false,error:'Student with that email already exists'})
    }

 
    const teacher  = await Teacher.create({
        name,
        email,
        password,
        phone,
        subject
      
    })
    sendTokenResponse(teacher,200,res)
   
 })

 exports.login =asyncHandler(async (req,res,next) =>{
    const {email,password} = req.body
    const teacher = await Teacher.findOne({email}).select('+password')

    if(!teacher){
        return res.json({sucess:false,error:'Invalid Credentials'})

    }
 
    const isMatch = await teacher.matchPassword(password)
    if(!isMatch){
        return res.json({sucess:false,error:'Invalid Credentials'})
    }
    sendTokenResponse(teacher,200,res)
 })

 





const sendTokenResponse = (user,statusCode,res)=>{
     const token = user.getSignedJwtToken()
   
     res.cookie("t", token, { expire: new Date() + 9999 })

     res
      .status(statusCode)
      .json({sucess:true, token,user})

}

   