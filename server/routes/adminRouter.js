const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/", (req, res, next) => {
  console.log("adminRouter");
});

module.exports = adminRouter;
