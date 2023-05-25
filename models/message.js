const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  room: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = model("Message", messageSchema);
