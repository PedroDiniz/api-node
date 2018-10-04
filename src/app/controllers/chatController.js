const express = require("express");
const Chat = require("../models/chat");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var io = require("socket.io").listen(server);

// LIST
exports.list = async function(req, res) {
  try {
    const chat = await Chat.find().populate(["users", "messages.userId"]);

    return res.send({ chat });
  } catch (err) {
    return res.status(400).send({ error: "Error loading chat" });
  }
};

//GET ALL CHATS THAT YOU PARTICIPATE
exports.getChats = async function(req, res) {
  try {
    const chat = await Chat.find({ users: req.params.userId }).populate([
      "users",
      "messages.userId"
    ]);

    socket.emit("chats", {
      chats: chat
    });

    return res.send({ chat });
  } catch (err) {
    return res.status(400).send({ error: "Error loading chat" });
  }
};

// GET MESSAGES FROM CHAT
exports.getMessages = async function(req, res) {
  try {
    const chat = await Chat.findOne({ users: req.params.user }).populate([
      "users",
      "messages.userId"
    ]);

    return res.send({ chat });
  } catch (err) {
    return res.status(400).send({ error: "Error loading chat" });
  }
};

// CREATE
exports.create = async function(req, res) {
  try {
    const { users } = req.body;

    const chat = await Chat.findOne({ users: users }).populate([
      "users",
      "messages.userId"
    ]);
    if (!chat) {
      const chat = await Chat.create({
        users,
        createdAt: Date.now()
      });

      return res.send({ chat });
    } else {
      return res
        .status(400)
        .send({ error: "Error creating new chat, chat already exist" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error creating new chat" });
  }
};

// SEND MESSAGE
exports.sendMessage = async function(req, res) {
  try {
    const { users, message } = req.body;

    const chat = await Chat.findOne({ users: users }).populate([
      "users",
      "messages.userId"
    ]);
    if (chat) {
      const messages = chat.messages.push(message);

      const chat = await Chat.update(
        {
          messages
        },
        { new: true }
      );

      return res.send({ chat });
    } else {
      return res
        .status(400)
        .send({ error: "Error on update chat, chat don't exist" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error creating new chat" });
  }
};

// UPDATE
exports.update = async function(req, res) {
  try {
    const { messages, updatedAt } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      req.params.chatId,
      {
        messages,
        updatedAt
      },
      { new: true }
    );

    return res.send({ chat });
  } catch (err) {
    return res.status(400).send({ error: "Error updating chat" });
  }
};

// REMOVE
exports.delete = async function(req, res) {
  try {
    const chat = await Chat.findByIdAndRemove(req.params.chatId);

    return res.send({ chat });
  } catch (err) {
    return res.status(400).send({ error: "Error loading chat" });
  }
};
