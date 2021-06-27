const JWT = require('jsonwebtoken')
const Student = require("../models/Student")
const asyncHandler = require('../middleware/asyn')


exports.register = asyncHandler(async (req,res,next) =>{
    const {name,email,password,phone} = req.body

    const stud = await Student.findOne({email:email})

    if(stud){
        return res.json({sucess:false,error:'Student with that email already exists'})
    }

 
    const student  = await Student.create({
        name,
        email,
        password,
        phone
      
    })
    sendTokenResponse(student,200,res)
   
 })

 exports.login =asyncHandler(async (req,res,next) =>{
    const {email,password} = req.body
    const student = await Student.findOne({email}).select('+password')

    if(!student){
        return res.json({sucess:false,error:'Invalid Credentials'})

    }
 
    const isMatch = await student.matchPassword(password)
    if(!isMatch){
        return res.json({sucess:false,error:'Invalid Credentials'})
    }
    sendTokenResponse(student,200,res)
 }
 )

 exports.add =asyncHandler(async(req,res,next) =>{
     console.log(req.user)
     const student = await Student.findById(req.user)
     if(student.favrt_List.includes(req.params.Id)){
        return res.json({sucess:false,error:'Teacher already in favrt List'})

     }
     await student.favrt_List.push(req.params.Id)

     await student.save()
     
     res
      .status(200)
      .json({sucess:true, msg:'favrt teacher added into list'})

     
     
 })

 exports.remove =asyncHandler(async(req,res,next) =>{
    
    const student = await Student.findById(req.user)

    if(student.favrt_List.includes(req.params.Id)){
        await student.favrt_List.pull(req.params.Id)

    }
    

    await student.save()
    
    res
     .status(200)
     .json({sucess:true, msg:'favrt teacher removed from list'})

    
    
})

exports.favrt =asyncHandler(async(req,res,next)=>{

    const favrt = await Student.aggregate([
        { $unwind: { path: "$favrt_List" }},

        {$group:{"_id":"$favrt_List", "count":{"$sum":1}}},
        

        { $sort : { "count" : -1 } },

        { "$limit": 1 },




        {
      
            $lookup:
              {
                from: "teachers", 
                localField: "_id",
                foreignField: "_id",
                as: "teacher"
              }
            },
           


    ])
    
    return res.json({sucess:true,teacher:favrt[0].teacher[0]})
  
  })






const sendTokenResponse = (user,statusCode,res)=>{
     const token = user.getSignedJwtToken()
   
     res.cookie("t", token, { expire: new Date() + 9999 })

     res
      .status(statusCode)
      .json({sucess:true, token,user
})

}   