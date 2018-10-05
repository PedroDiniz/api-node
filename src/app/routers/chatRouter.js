const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.get("/getChats/:userId", chatController.getChats);

router.post("/createChat", chatController.createChat);

router.post("/sendMessage", chatController.sendMessage);

module.exports = router;
