const jwt=require("jsonwebtoken");
require('dotenv').config();
const asyncHandler=require("express-async-handler");
const UserModel=require("../model/userModel.js");

const protect=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            //token verification
            token=req.headers.authorization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.SECRET_KEY);
            req.user=await UserModel.findById(decoded.id).select('-password'); 
            next();
            
        }
        catch(e){
            res.status(401);
        throw new Error("not authorized");
        }
    }
});


module.exports=protect;