const express = require("express");
const { authenticateToken } = require("../helpers/accessToken");
const { sendEmail } = require("../helpers/mailService");

const router = express.Router();

const userService = require("../services/userService");

router.get("/", authenticateToken, (req, res) => {
  res.status(200);
  res.send("Check");
});

router.get("/alluser/desktop", authenticateToken, async (req, res) => {
  const response = await userService.getTotalUserCount();
  res.status(200);
  res.send(response);
});

router.get("/alluser/details", authenticateToken, async (req, res) => {
  const response = await userService.getAllUsersWithDetails();
  res.status(200);
  res.send(response);
});

router.get("/alluser/mobile", authenticateToken, async (req, res) => {
  const response = await userService.getTotalMobileUserCount();
  res.status(200);
  res.send(response);
});

router.get("/mobile/check/:userId", authenticateToken, async (req, res) => {
  const result = await userService.getMobileDevice(req.params.userId);
  res.status(200);
  res.send(result);
});

router.get("/system/:userId", authenticateToken, async (req, res) => {
  const result = await userService.getUserSystem(req.params.userId);
  res.status(200);
  res.send(result);
});

router.post("/reset", async (req, res) => {
  const result = await userService.resetUserPassword(req.body);
  res.status(200);
  res.send(result);
});

router.put("/reset", async (req, res) => {
  const result = await userService.changePassword(req.body);
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
