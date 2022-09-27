require("dotenv").config();
const express = require("express");
const app = express();

const http = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const io = require("socket.io")(http);

const sockets = [];

const userController = require("./src/controllers/userController");
const notificationController = require("./src/controllers/notificationController");
const cctvController = require("./src/controllers/cctvController");
const cctvService = require("./src/services/cctvService");
const { authenticateToken } = require("./src/helpers/accessToken");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/notification", notificationController);
app.use("/api/cctv", cctvController);

http.listen(process.env.PORT, () => {
  console.log("Server started sucessfully!");
});

app.get(
  "/api/cctv/setsettings/:systemId/:status/:result",
  authenticateToken,
  async (req, res) => {
    const systemId = req.params.systemId;
    const status = req.params.status;
    const socket = sockets.find((item) => item.systemId === systemId);
    socket.socket.emit("intrusion-message", status);
    res.status(200);
    res.send(JSON.parse(req.params.result));
  }
);

io.use(async (socket, next) => {
  const id = socket.handshake.auth.systemId;
  try {
    const existence = await cctvService.getCCTVSystem(id);
    if (!existence) {
      return next(new Error("invalid system Id"));
    }
  } catch (error) {
    next(new Error("Error in connecting"));
  }
  next();
});

// Socket connection
io.on("connection", function (socket) {
  // Validation of the systemId is required
  sockets.push({
    socket: socket,
    systemId: socket.handshake.auth.systemId,
  });

  // Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    const disconnetId = socket.id;
    const index = sockets.findIndex((item) => item.socket.id === disconnetId);
    sockets.splice(index, 1);
  });
});

module.exports = { sockets };
