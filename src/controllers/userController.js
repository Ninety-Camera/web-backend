const express = require("express");

const router = express.Router();

const userService = require("../services/userServie");

router.post("/register", async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
