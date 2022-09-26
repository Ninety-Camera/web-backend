require("dotenv").config();
const express = require("express");
const app = express();

const http = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const io = require("socket.io")(http);

const userController = require("./src/controllers/userController");
const notificationController = require("./src/controllers/notificationController");
const cctvController = require("./src/controllers/cctvController");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/notification", notificationController);
app.use("/api/cctv", cctvController);

http.listen(process.env.PORT, () => {
  console.log("Server started sucessfully!");
});

// Socket connection
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("intrusion-occured", (msg) => {
    console.log("message: " + msg);
  });

  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});
