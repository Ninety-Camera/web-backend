const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cameraService = require("../services/cameraService");

const router = express.Router();

router.post("/add", authenticateToken, async (req, res) => {
  const result = await cameraService.addCamera(req.body);
  res.status(200);
  res.send(result);
});

router.get("/:id", authenticateToken, async (req, res) => {
  const result = await cameraService.getCameras(req.params.id);
  res.status(200);
  res.send(result);
});

router.put("/update", authenticateToken, async (req, res) => {
  const result = await cameraService.updateCameraStatus(req.body);
  res.status(200);
  res.send(result);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const result = await cameraService.deleteCamera(req.params.id);
  res.status(200);
  res.send(result);
});
module.exports = router;
