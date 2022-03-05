const express = require("express");
const router = express.Router();
const Todos = require("../../models/todos");

module.exports = router.get("/", async (req, res) => {
  const userID = req.header("user-id");
  const todoExist = await Todos.findOne({
    userId: userID,
  });
  if (todoExist) {
    return res.json(todoExist);
  } else {
    res.send("No data found");
  }
});
