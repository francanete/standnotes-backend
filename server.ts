require("dotenv").config();
import express from "express";

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello StandNotes" });
});

app.listen(process.env.PORT, () => {
  console.log("====================================");
  console.log(`Server started on port ${process.env.PORT}`);
  console.log("====================================");
});
