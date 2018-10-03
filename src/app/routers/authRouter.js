const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/signin", authController.signin);

router.post("/forgot_password", authController.forgotPassword);

router.post("/reset_password", authController.resetPassword);

module.exports = router;
