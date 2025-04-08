const express = require("express");
const router = express.Router();
const routeController=require("../controller/reviewController.js");
const protect=require("../middleware/auth.js");

router.get("/all",routeController.getAllReviews);

router.post("/add",protect,routeController.addReview);

router.delete("/delete/:id",protect,routeController.deleteReview);



module.exports = router;