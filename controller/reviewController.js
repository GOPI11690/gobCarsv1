const mongoose=require("mongoose");
const ReviewModel=require("../model/reviewModel.js");
const asyncHandler=require("express-async-handler");

/* Get All review Data - GET method */
const getAllReviews=asyncHandler(async (req, res) => { 
    try{
        //get all review data
    const reviews=await ReviewModel.find({});
    if(!reviews){
        res.status(400);
        throw new Error("Reviews not found");
    }
    console.log("Get all Reviews Data successfully ");
    res.status(200).json(reviews);
    }
    catch(err) {res.send(err);}
    
});

//creating review data
const addReview=asyncHandler(async(req, res) => {
    try{
        //review validation
    const {review,rating}=req.body;
    if(!review){
        res.status(400);
        throw new Error("Please enter all the details");
    }
    //adding review data
    const addReview=await ReviewModel.create({
        review,rating,userid:req.user.id,
    });
    res.status(200).send(addReview);
    console.log("Review data added successfully ");
    }
    catch(err){
        res.send(err);
    } 
});
//delete review data
const deleteReview=asyncHandler(async(req,res) => {
    try{
        //review data validation
        const review=await ReviewModel.findById(req.params.id);
        if(!review){
            res.status(400);
            throw new Error("review not found");
        }
        //user validation
        if(review.userid.toString()!==req.user.id){
            res.status(401);
            throw new Error("User not authorized");
        }
        //deleting review data by id
        const deleteReview=await ReviewModel.deleteOne({_id:req.params.id});
        res.status(200).send("Review deleted sucessfully");
    }
    catch(err){res.send(err);}
});


module.exports={getAllReviews,addReview,deleteReview};