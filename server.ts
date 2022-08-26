require("dotenv").config();

import express from "express";
import { Error } from "mongoose";
const mongoose = require("mongoose");
const notesRoutes = require("./routes/notes");

const app = express();

// Middleware

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/notes", notesRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Server connected to DB and started on port ${process.env.PORT}`
      );
    });
  })
  .catch((error: Error) => console.log(error));
