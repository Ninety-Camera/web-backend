const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cctvService = require("../services/cctvService");
const cameraService = require("../services/cameraService");

const router = express.Router();
const sockets = require("../../sockets");

router.post("/add", authenticateToken, async (req, res) => {
  const data = { userId: req.user.id, ...req.body };
  const result = await cctvService.addCCTVSystem(data);
  res.status(200);
  res.send(result);
});

router.get("/validate/:systemId", authenticateToken, async (req, res) => {
  const result = await cctvService.validateSystem(req.params.systemId);
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
    const cameraPromises = [];
    const response = await cameraService.getCameras(req.body.systemId);
    const cameras = response.data.cameras;
    cameras.forEach((element) => {
      cameraPromises.push(
        new Promise(async (resolve, reject) => {
          try {
            const result = await cameraService.updateCameraStatus({
              id: element.id,
              status: req.body.newStatus,
              systemId: req.body.systemId,
            });
            if (result.status === 200) {
              resolve(result.data.camera);
            } else {
              reject();
            }
          } catch (error) {
            reject();
          }
        })
      );
    });
    Promise.all(cameraPromises).then((values) => {
      res.status(200);
      res.send({ ...result, data: { ...result.data, cameras: values } });
    });
  } else {
    res.status(200);
    res.send(result);
  }
});

module.exports = router;
