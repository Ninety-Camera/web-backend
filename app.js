//app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./src/controllers/userController");
const cctvController = require("./src/controllers/cctvController");
const intrusionController = require("./src/controllers/intrusionController");
const cameraController = require("./src/controllers/cameraController");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/cctv", cctvController);
app.use("/api/intrusion", intrusionController);
app.use("/api/camera", cameraController);

app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});

module.exports = app;
