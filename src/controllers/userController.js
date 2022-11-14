const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const { sendEmail } = require("../helpers/mailService");

const router = express.Router();

const userService = require("../services/userService");

router.get("/", authenticateToken, (req, res) => {
  res.status(200);
  res.send("Check");
});

router.post("/reset", async (req, res) => {
  const result = await userService.resetUserPassword(req.body);
  res.status(200);
  res.send(result);
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

router.post("/mobile/register", authenticateToken, async (req, res) => {
  const result = await userService.registerMobileDevice(req.body);
  res.status(200);
  res.send(result);
});

router.put("/password", async (req, res) => {
  const result = await userService.resetPassword(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
