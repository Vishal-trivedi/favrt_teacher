
const jwt = require('jsonwebtoken')


exports.protect =async(req,res,next)=>{
    let token;
    const  JWT_SECRET  = process.env.JWT_SECRET
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        
    }
   
    //else if(req.cookies.token){
      //  token = req.cookies.token
   // }
   if(!token){
       
       return res.status(401).json('Not authorize to access this route '+req.headers.authorization)
    }
   try{
       const decoded =  jwt.verify(token,JWT_SECRET)
      
         req.user = decoded.id
       next()

   }catch(err){ 
    return res.status(401).json('Not  authorized to acess this route') 
   }

}