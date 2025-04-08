const mongoose=require("mongoose");
const UserModel=require("../model/userModel.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const asyncHandler=require("express-async-handler");


/* Get All user Data - GET method */
const getAllUsers=async (req, res) => { 
    try{
        //get all users data
    const user=await UserModel.find({});
    console.log("Get all users Data sucessfully ");
    res.status(200).json(user);
    }
    catch(err) {res.send(err);}
    
};

/* Get user data with id - GET method */
const getUser=async (req, res) => { 
    try{
        //get user data
        const user=await UserModel.findById(req.params.id);
        res.status(200).json(user);
        console.log("Get Selected user Data successfully ");
    }
    catch(err){res.send(err);}
    
};
//login user
const loginUser=asyncHandler(async(req, res) => {
    const {email,password} = req.body;
    const user=await UserModel.findOne({email});
    //user exists
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            contact:user.contact,
            email:user.email,
            role:user.role,
            userstatus:user.userstatus,
            token:generateToken(user._id)
        });
    }
    else{
        res.status(400);
        throw new Error("Invalid email and password");
    }
});
    

//register new user
const addUser=asyncHandler(async(req, res) => {
    const {name,contact,email,password,role,userstatus}=req.body;
    //check user data validation
    if(!name || !contact||!email||!password||!role||!userstatus){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //User already exists or not
    const userExists=await UserModel.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    } 
    //hash password
    const salt=await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashedPwd=await bcrypt.hash(password,salt);

    //add user
    const user=await UserModel.create({
        name:name,
        contact:contact,
        email:email,
        password:hashedPwd,
        role:role,
        userstatus:userstatus
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            contact:user.contact,
            email:user.email,
            role:user.role,
            userstatus:user.userstatus
        });
    }
    else{
        res.status(400);
        throw new Error("Invalid Data");
    }
});
//update user data
const updateUser=asyncHandler(async(req,res)=>{
    //find user in db
    const user=await UserModel.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error("user not found");
    }
    //update user data by id in db
    const updatedUser=await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send(updatedUser);
});

//delete user data
const deleteUser=asyncHandler(async(req,res) => {
    //find user in db
    const user=await UserModel.findById(req.params.id);
    if(!user){
        res.status(400);
        throw new Error("user not found");
    }
    //delete user data by id in db
    const deletedUser=await UserModel.deleteOne({_id:req.params.id});
    res.status(200).send({id:req.params.id});
});
//token generation with id
const generateToken=(id)=>{
    const token=jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'30d'});
    return token;
}

module.exports = {getAllUsers,getUser,addUser,updateUser,deleteUser,loginUser};