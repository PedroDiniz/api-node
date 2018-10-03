const express = require("express");
import {
  signup,
  signin,
  forgotPassword,
  resetPassword
} from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/forgot_password", forgotPassword);

router.post("/reset_password", resetPassword);

export default router;
