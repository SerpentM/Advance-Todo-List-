const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //check for token
  if (!token) {
    res.status(401).json({ msg: "Invalid Token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    //Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "token is not valid " });
  }
}
module.exports = auth;
