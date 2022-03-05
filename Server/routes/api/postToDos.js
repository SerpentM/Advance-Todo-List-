const express = require("express");
const router = express.Router();
const Todos = require("../../models/todos");

module.exports = router.post("/", async (req, res) => {
  const userID = req.body.userDataid;
  const todos = req.body.todos;

  const newTodos = new Todos({
    userId: userID,
    todos: todos,
  });
  const todoExist = await Todos.findOne({
    userId: userID,
  });
  if (todoExist) {
    todoExist.todos = todos;
    todoExist.save();
  } else {
    try {
      const saveUser = await newTodos.save();
      res.send(saveUser);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
});
