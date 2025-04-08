const {default : mongoose}=require("mongoose");
const dotenv = require('dotenv');

//dotenv configuration
dotenv.config();
const DB_URL = process.env.DB_URL;

//connect to the database
const connectDB= async ()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log("connected to Database ");
    }
    catch(e){
        console.log(e);
    }
};
//disconect from the database
const disconnectDB= async ()=>{
    try    {
        await mongoose.disconnect();
        console.log("Database disconnected sucessfully");
    }
    catch(err){
        console.log(err);
    }    
}
module.exports = {connectDB,disconnectDB};