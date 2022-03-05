const mongoose = require("mongoose");
const UserScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserScheme);
