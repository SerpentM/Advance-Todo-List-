const mongoose = require("mongoose");
const Todos = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  todos: { type: Array, required: true },
});

module.exports = mongoose.model("ToDos", Todos);
