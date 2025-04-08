const mongoose=require("mongoose");
const CarModel=require("../model/carModel.js");
const asyncHandler=require("express-async-handler");

/* Get All Car Data - GET method */
const getAllCars=asyncHandler(async (req, res) => { 
    try{
        //get all car data
    const cars=await CarModel.find({});
    //cars validation
    if(!cars){
        res.status(400);
        throw new Error("Cars not found");
    }
    console.log("Get all Cars Data successfully ");
    res.status(200).json(cars);
    }
    catch(err) {res.send(err);}
    
});
/* Get Car data with id - GET method */
const getCar=asyncHandler(async (req, res) => { 
    try{
        //get car data
        const car=await CarModel.findById(req.params.id);  
        //car data validation 
        if(!car){
            res.status(400);
            throw new Error("Car not found");
        }
        res.status(200).json(car);
        console.log("Get Selected Car Data successfully ");
    }
    catch(err){res.send(err);}
    
});

//creating car details
const addCar=asyncHandler(async(req, res) => {
    const {name,description,brand,fuel,capacity,plateno,status,rate}=req.body;
    //car data validation
    if(!name||!description||!brand||!fuel||!capacity||!rate){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //adding car data
    const car=await CarModel.create({
        name,description,brand,fuel,capacity,plateno,status,rate,
        userid:req.user.id,
    });
    res.status(200).send(car);
    console.log("Car added successfully ");
});
//update cara data
const updateCar=asyncHandler(async(req,res)=>{
    //get car data by id
    const car=await CarModel.findById(req.params.id);
    //car validation
    if(!car){
        res.status(400);
        throw new Error("Car not found");
    }
    //user validation
    if(!req.user){
        res.status(401);
        throw new Error("User not found");
    }
    //authorized user only updating car
    if(car.userid.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
    //updating the car data
    const updateCar=await CarModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).send(updateCar)
    console.log("Car info updated ");
});
//delete car data
const deleteCar=asyncHandler(async(req,res) => {
    //get car data  by id
    const car=await CarModel.findById(req.params.id);
    //car validation
    if(!car){
        res.status(400);
        throw new Error("Car not found");
    }
    //user validation
    if(!req.user){
        res.status(401);
        throw new Error("User not found");
    }
    //authorized user only deleting car
    if(car.userid.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
    //deleting the car data
    const deleteCar=await CarModel.deleteOne({_id:req.params.id});
    res.status(200).send("Car ID : "+car.id);
    console.log("Car deleted successfully");
});
module.exports = {getAllCars,getCar,addCar,updateCar,deleteCar};