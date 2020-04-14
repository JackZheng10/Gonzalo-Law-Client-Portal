const mongoose = require("mongoose");

const PasswordReset = new mongoose.Schema({
  email: {
    type: String,
    unique: false,
    required: true,
  },
  sessionID: {
    type: String,
    unique: true,
    required: true,
  },
  created: {
    type: Date,
    unique: false,
    required: true,
  },
  used: {
    type: Boolean,
    unique: false,
    required: true,
  },
});
