const express = require("express");
const Chat = require("../models/chat");
const Message = require("../models/message");


//GET ALL CHATS THAT YOU PARTICIPATE
exports.getChats = async function(req, res) {
  try {
    const chats = await Chat.find({ users: req.params.userId }).populate([
      "users",
      "messages.userId"
    ]);

    if (!chats) {
      return res.send({ error: "Error loading chat..." });
    } else {
      const fullChats = [];
      chats.forEach(conversation => {
        Message.find({ conversationId: conversation._id })
          .sort("-createdAt")
          .limit(1)
          .populate(["userId", "conversationId"])
          .exec((err, message) => {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullChats.push(message);
            if (fullChats.length === chats.length) {
              return res.status(200).json({ conversations: fullChats });
            }
          });
      });
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

    if (!users) {
      res.status(422).send({ error: "Please select an user." });
      return next();
    }

    if (!messages) {
      res.status(422).send({ error: "Please enter a message." });
      return next();
    }

    const chat = await Chat.findOne({ users: users }).populate([
      "users",
      "messages.userId"
    ]);
    if (!chat) {
      const chat = await Chat.create({
        users,
        createdAt: Date.now()
      }).then(chat => {
        const message = await Message.create({
          message: messages,
          userId: author,
          conversationId: chat._id
        })

        return res.status(200).send({ message: 'Conversation started!'});
        });  
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

    const chat = await Chat.findOne({ users: users }).populate([
      "users",
      "messages.userId"
    ]);

    if(chat){
      const message = await Message.create({
        message: messages,
        userId: author,
        conversationId: chat._id
      })
    } else{
      create(author, user, messages);
    }


    return res.status(200).send({ message: 'Conversation updated!'});
   
  } catch (err) {
    return res.status(400).send({ error: "Error creating new chat" });
  }
};

