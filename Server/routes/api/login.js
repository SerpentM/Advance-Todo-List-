const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userExist = await User.findOne({
    email: email,
  });
  if (userExist) {
    if (userExist.password === password) {
      jwt.sign(
        {
          id: userExist.id,
        },
        process.env.JWTSECRET,
        { expiresIn: 500 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: userExist._id,
              email: userExist.email,
              username: userExist.userName,
            },
          });
        }
      );
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } else {
    res.send("no user found");
  }
});
