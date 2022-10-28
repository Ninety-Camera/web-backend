const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");

const router = express.Router();

const intrusionService = require("../services/intrusionService");
const notificationService = require("../services/notificationService");

router.get("/get/:systemId", authenticateToken, async (req, res) => {
  const response = await intrusionService.getIntrusions(req.params.systemId);
  res.status(200);
  res.send(response);
});

router.post("/add", authenticateToken, async (req, res) => {
  const response = await intrusionService.addIntrusion(req.body);
  await notificationService.sendNotification(req.body);
  res.status(200);
  res.send(response);
});

router.post("/image", authenticateToken, async (req, res) => {
  const response = await intrusionService.addIntrusionImage(req.body);
  res.status(200);
  res.send(response);
});

router.post("/video", authenticateToken, async (req, res) => {
  const response = await intrusionService.addIntrusionVideo(req.body);
  res.status(201);
  res.send(response);
});

module.exports = router;