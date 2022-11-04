const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");

const router = express.Router();

const userService = require("../services/userService");

router.get("/", authenticateToken, (req, res) => {
  res.status(200);
  res.send("Check");
});

router.post("/login", async (req, res) => {
  const result = await userService.logInUser(req.body);
  res.status(200);
  res.send(result);
});

router.post("/register", async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.status(200);
  res.send(result);
});

router.post("/mobile/regiser", authenticateToken, async (req, res) => {
  const result = await userService.registerMobileDevice(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
