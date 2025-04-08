const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review:{ type: String, required: true },
  rating:{ type: Number, required: true },
  userid: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
   }  
},
{timestamps:true});

module.exports = mongoose.model("userreviews", reviewSchema);

