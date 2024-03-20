const express = require("express");
const PORT = "8080";
const userRouter = require("./routes/userRouter.js");
const adminRouter = require("./routes/adminRouter.js");

const app = express();

app.use("/api", userRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Server started.");
});
