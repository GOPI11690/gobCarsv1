const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 15 },
  description: { type: String, required: true, maxLength: 150 },
  brand:{ type: String, required: true },
  fuel:{ type: String, required: true },
  capacity: { type:Number, required: true },
  plateno: { type: String, required: true, },
  status:{type:String,required:true},
  rate:{ type: Number, required: true},
  userid: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: "users",
    },
},
{timestamps:true});

module.exports = mongoose.model("cars", carSchema);

