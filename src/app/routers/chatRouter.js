const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.get("/getChats/:userId", chatController.getChats);

router.get("/getMessages/:userId", chatController.getMessages);

router.post("/createChat", chatController.createChat);

router.post("/sendMessage", chatController.sendMessage);

router.put("/updateChat/:chatId", chatController.update);

router.delete("/deleteChat/:chatId", chatController.delete);

module.exports = router;
