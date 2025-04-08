const mongoose=require("mongoose");
const RentalModel=require("../model/rentalModel.js");
const asyncHandler=require("express-async-handler");

/* Get All rental Data - GET method */
const getAllRentals=asyncHandler(async (req, res) => { 
    try{
        //get all rental data
    const rentals=await RentalModel.find({});
    //validation
    if(!rentals){
        res.status(400);
        throw new Error("Rentals not found");
    }
    console.log("Get all Rental Data successfully ");
    res.status(200).json(rentals);
    }
    catch(err) {res.send(err);}
    
});
/* Get rental data with id - GET method */
const getRental=asyncHandler(async (req, res) => { 
    try{
        //find rental data by id
        const rental=await RentalModel.findById(req.params.id);
        if(!rental){
            res.status(400);
            throw new Error("Rental not found");
        }
        res.status(200).json(rental);
        console.log("Get Selected Rental Data successfully ");
    }
    catch(err){res.send(err);}
    
});

//creating Rental details
const addRental=asyncHandler(async(req, res) => {
    try{//validation
    const {rentaldate,returndate,amount,rentalstatus}=req.body;
    if(!rentaldate||!amount){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //add rental data
    const rental=await RentalModel.create({
        rentaldate,returndate,amount,rentalstatus,
        carid:req.headers.carid,
        userid:req.user.id,
    });
    res.status(200).send(rental);
    console.log("Rental added")    
}
catch(err){res.send(err);}
});
//deleting rental data
const deleteRental=asyncHandler(async(req,res) => {
    //find rental data by id
    const rental=await RentalModel.findById(req.params.id);
    //rental data validation
    if(!rental){
        res.status(400);
        throw new Error("rental not found");
    }
    //user validation
    if(rental.userid.toString()!==req.user.id){
        res.status(401);
        throw new Error("User not authorized");
    }
    //deleting rental data by id
    const deletedRental=await RentalModel.deleteOne({_id:req.params.id});
    res.status(200).send("Rental deleted sucessfully");
});

module.exports = {getAllRentals,getRental,addRental,deleteRental};