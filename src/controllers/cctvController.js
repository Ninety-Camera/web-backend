const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const cctvService = require("../services/cctvService");

const router = express.Router();

router.post("/add", authenticateToken, async (req, res) => {
  const data = { userId: req.user.id, ...req.body };
  const result = await cctvService.addCCTVSystem(data);
  res.status(200);
  res.send(result);
});

module.exports = router;
