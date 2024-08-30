const express = require("express");
const router = new express.Router();
const userAuthController = require("../../controllers/usercontrollers/userControllers");

// user auth routes
router.post("/register",userAuthController.register)
router.post("/login",userAuthController.login);



module.exports = router;