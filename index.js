require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./src/controllers/userController");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);

app.listen(process.env.PORT, () => {
  console.log("Server started sucessfully!");
});
