const express = require("express");
const Chat = require("../models/chat");
const Message = require("../models/message");

//GET ALL CHATS THAT YOU PARTICIPATE
exports.getChats = async function(req, res) {
  try {
    const chats = await Chat.find({ users: req.params.userId }).populate([
      "users",
      "messages"
    ]);

    if (!chats) {
      return res.send({ error: "Error loading chat..." });
    } else {
      return res.status(200).send({ chats });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error loading chat" });
  }
};

// CREATE
exports.create = async function(req, res, next) {
  try {
    const { author, user, messages } = req.body;

    const users = [author, user];

    const users2 = [user, author];

    if (!users) {
      res.status(422).send({ error: "Please select an user." });
      return next();
    }

    if (!messages) {
      res.status(422).send({ error: "Please enter a message." });
      return next();
    }

    const chat = await Chat.findOne({ users: users, users: users2 }).populate([
      "users",
      "messages"
    ]);
    if (!chat) {
      const chat = await Chat.create({
        users,
        createdAt: Date.now()
      });
      if (chat) {
        const message = await Message.create({
          message: messages,
          userId: author,
          conversationId: chat._id
        });

        chat.messages.push(message._id);

        await chat.save();

        return res.status(200).send({ message: "Conversation started!" });
      } else {
        return res
          .status(400)
          .send({ error: "Error on creating conversation!" });
      }
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
    const { author, user, messages } = req.body;

    const users = [author, user];
    const users2 = [user, author];

    const chat = await Chat.findOne({ users: users, users: users2 }).populate([
      "users",
      "messages"
    ]);

    if (chat) {
      const message = await Message.create({
        message: messages,
        userId: author,
        conversationId: chat._id
      });

      chat.messages.push(message._id);

      await chat.save();
    } else {
      return res
        .status(400)
        .send({ error: "Error creating new message, chat doesnt exists" });
    }

    return res.status(200).send({ message: "Conversation updated!" });
  } catch (err) {
    return res.status(400).send({ error: "Error creating new message" });
  }
};
