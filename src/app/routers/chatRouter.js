const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.get("/getChats/:userId", chatController.getChats);

router.post("/createChat", chatController.create);

router.post("/sendMessage", chatController.sendMessage);

module.exports = router;
