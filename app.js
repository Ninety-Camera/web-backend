//app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./src/controllers/userController");
const notificationController = require("./src/controllers/notificationController");
const cctvController = require("./src/controllers/cctvController");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/notification", notificationController);
app.use("/api/cctv", cctvController);

app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});

module.exports = app;
