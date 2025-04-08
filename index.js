const express=require("express");
const app= express();
const {connectDB}=require("./config/db.js");
const userRoutes=require('./routes/userRouter.js');
const carRoutes=require('./routes/carRouter.js');
const reviewRoutes=require('./routes/reviewRouter.js');
const rentalRoutes=require('./routes/rentalRouter.js');
//dotenv configuration
require('dotenv').config();
const PORT=process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/user",userRoutes);
app.use("/api/car",carRoutes);
app.use("/api/review",reviewRoutes);
app.use("/api/rental",rentalRoutes);

app.listen(PORT,()=>{
    console.log(`Welcome to GOB Cars - Server is Running at ${PORT}`);
});
connectDB();
