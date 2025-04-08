const express = require("express");
const router = express.Router();
const routeController=require("../controller/rentalController.js");
const protect=require("../middleware/auth.js");

router.get("/all",protect,routeController.getAllRentals);

router.get("/:id",protect,routeController.getRental);

router.post("/add",protect,routeController.addRental);

router.delete("/delete/:id",protect,routeController.deleteRental);



module.exports = router;