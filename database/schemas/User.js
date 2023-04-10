const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  privateID: {
    type: String,
    required: true,
    unique: true,
  },
  friends: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
