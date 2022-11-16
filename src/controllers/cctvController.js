const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cctvService = require("../services/cctvService");
const cameraService = require("../services/cameraService");
const notificationService = require("../services/notificationService");

const router = express.Router();
const sockets = require("../../sockets");

router.post("/add", authenticateToken, async (req, res) => {
  const data = { userId: req.user.id, ...req.body };
  const result = await cctvService.addCCTVSystem(data);
  res.status(200);
  res.send(result);
});

router.post("/notification/test", authenticateToken, async (req, res) => {
  const result = await notificationService.sendNotifications(req.body.tokens);
  res.status(200);
  res.send(result);
});

router.get("/validate/:systemId", authenticateToken, async (req, res) => {
  const result = await cctvService.validateSystem(req.params.systemId);
  res.status(200);
  res.send(result);
});

router.get("/subscribed/:systemId", authenticateToken, async (req, res) => {
  const result = await cctvService.getSubscriberUsers(req.params.systemId);
  res.status(200);
  res.send(result);
});

router.delete("/subscribed/user", authenticateToken, async (req, res) => {
  const result = await cctvService.deleteSubscribedUser(req.body?.userId);
  res.status(200);
  res.send(result);
});

router.put("/update/camera", authenticateToken, async (req, res) => {
  const result = await cctvService.updateCCTVSystem(req.body);
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
    const response = await cameraService.updateManyCameraStatus(
      systemId,
      status
    );
    res.status(200);
    res.send({ ...response, data: { ...response.data, system: result.data } });
  } else {
    res.status(200);
    res.send(result);
  }
});

module.exports = router;
