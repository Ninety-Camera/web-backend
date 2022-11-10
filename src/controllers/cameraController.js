const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cameraService = require("../services/cameraService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const result = await cameraService.addCamera(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
