const mongoose = require("../../database");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    timezone: "America/Sao_Paulo"
  }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
