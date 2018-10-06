const express = require("express");
const Chat = require("../models/chat");
const Message = require("../models/message");

//GET ALL CHATS THAT YOU PARTICIPATE
exports.getChats = async function(users) {
  try {
    const chats = await Chat.find({ users }).populate(["users", "messages"]);

    if (!chats) {
      return { error: "Error loading chat..." };
    } else {
      return chats;
    }
  } catch (err) {
    return { error: "Error loading chat" };
  }
};

// CREATE
exports.create = async function(author, user, messages) {
  try {
    const users = [author, user];

    const users2 = [user, author];

    if (!users) {
      return { error: "Please select an user." };
    }

    if (!messages) {
      return { error: "Please enter a message." };
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

        return message;
      } else {
        return { error: "Error on creating conversation!" };
      }
    } else {
      return { error: "Error creating new chat, chat already exist" };
    }
  } catch (err) {
    return { error: "Error creating new chat" };
  }
};

// SEND MESSAGE
exports.sendMessage = async function(author, user, messages) {
  try {
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
      return { error: "Error creating new message, chat doesnt exists" };
      //create(author, user, messages);
    }

    return message;
  } catch (err) {
    return { error: "Error creating new message" };
  }
};
