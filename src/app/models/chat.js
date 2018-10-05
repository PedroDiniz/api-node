const mongoose = require("../../database");

const ChatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      require: true
    }
  ],
  createdAt: {
    type: Date,
    timezone: "America/Sao_Paulo"
  },

  updatedAt: {
    type: Date,
    default: Date.now,
    timezone: "America/Sao_Paulo"
  }
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
