const express = require("express");
const router = express.Router();
const routeController=require("../controller/userController.js");
const protect=require("../middleware/auth.js");

router.get("/all",protect,routeController.getAllUsers);

router.get("/:id",protect,routeController.getUser);

router.post("/add",routeController.addUser);

router.post("/login",routeController.loginUser);

router.delete("/delete/:id",protect,routeController.deleteUser);

router.put("/update/:id",protect,routeController.updateUser)




module.exports = router;