const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");

const router = express.Router();

const notificationService = require("../services/notificationService");

router.post("/send", authenticateToken, async (req, res) => {
  const result = await notificationService.sendNotification(
    req.body.deviceId,
    {}
  );
  res.status(200);
  res.send(result);
});

module.exports = router;
