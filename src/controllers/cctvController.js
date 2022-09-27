const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cctvService = require("../services/cctvService");

const router = express.Router();
const sockets = require("../../index");

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
    res.redirect(
      `/api/cctv/setsettings/${req.body.systemId}/${
        req.body.newStatus
      }/${JSON.stringify(result)}`
    );
  } else {
    res.status(200);
    res.send(result);
  }
});

module.exports = router;
