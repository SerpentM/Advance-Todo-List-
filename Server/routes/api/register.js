const express = require("express");
const router = express.Router();
const User = require("../../models/user");

module.exports = router.post("/", async (req, res) => {
  const email = req.body.email;
  const userName = req.body.username;
  const password = req.body.password;
  const userExist = await User.findOne({
    email: email,
  });
  if (userExist) {
    res.status(400).json({ msg: "User Already Exist" });
  } else {
    await User.create({
      email: email,
      password: password,
      userName: userName,
    }).then(res.status(200).json({ msg: "User Added" }));
  }
});
