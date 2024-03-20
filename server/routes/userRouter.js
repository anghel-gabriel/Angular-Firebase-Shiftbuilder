const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  console.log("userRouter");
});

module.exports = userRouter;
