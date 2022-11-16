require("dotenv").config();

const app = require("./app");

const http = require("http").Server(app);
const io = require("socket.io")(http);

const sockets = require("./sockets");
const cctvService = require("./src/services/cctvService");


http.listen(process.env.PORT, () => {
  console.log("Server started sucessfully!");
});

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
