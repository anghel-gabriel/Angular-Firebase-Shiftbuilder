const express = require("express");
const userRouter = express.Router();
const { addShift } = require("../controllers/shifts.js");

userRouter.get("/", addShift);

module.exports = userRouter;
