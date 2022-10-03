const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cctvService = require("../services/cctvService");

const router = express.Router();
const sockets = require("../../sockets");

router.post("/add", authenticateToken, async (req, res) => {
  const data = { userId: req.user.id, ...req.body };
  const result = await cctvService.addCCTVSystem(data);
  res.status(200);
  res.send(result);
});

router.put("/settings/change", authenticateToken, async (req, res) => {
  const data = { userId: req.user.id, ...req.body };
  const result = await cctvService.changeCCTVSettings(data);
  if (result.status === 201) {
    const systemId = req.body.systemId;
    const status = req.body.newStatus;
    if (sockets.length > 0) {
      const socket = sockets.find((item) => item.systemId === systemId);
      socket.socket.emit("intrusion-message", status);
    }
    res.status(200);
    res.send(result);
  } else {
    res.status(200);
    res.send(result);
  }
});

module.exports = router;
