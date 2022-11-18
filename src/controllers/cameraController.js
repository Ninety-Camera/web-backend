const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cameraService = require("../services/cameraService");
const cctvService = require("../services/cctvService");
const sockets = require("../../sockets");
const router = express.Router();

router.post("/add", authenticateToken, async (req, res) => {
  const result = await cameraService.addCamera(req.body);
  if (result.status === 201) {
    const systemCamUpdate = await cctvService.updateCameraCount(
      req.body.systemId,
      1
    );
  }
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
  if (result.status === 200) {
    const systemId = req.body.systemId;
    if (sockets.length > 0) {
      const socket = sockets.find((item) => item.systemId === systemId);
      socket.socket.emit("intrusion-message-camera", result?.data?.camera);
    }
  }
  res.status(200);
  res.send(result);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const result = await cameraService.deleteCamera(req.params.id);
  if (result.status === 201) {
    const systemCamUpdate = await cctvService.updateCameraCount(
      req.body.systemId,
      -1
    );
  }
  res.status(200);
  res.send(result);
});
module.exports = router;
