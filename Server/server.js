const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 7789;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, { useNewURLParser: true }, () => {
  console.log("connected to db!");
});

app.use("/api/login", require("./routes/api/login"));

app.use("/api/register", require("./routes/api/register"));

app.use("/api/posttodos", auth, require("./routes/api/postToDos"));

app.use("/api/gettodos", auth, require("./routes/api/getToDos"));

app.get("/api/auth", auth, (req, res) => {
  res.send(true);
});
app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
