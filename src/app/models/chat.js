const mongoose = require("../../database");

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    }
  ],
  messages: [
    {
      message: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
      }
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

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
