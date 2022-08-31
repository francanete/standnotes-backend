require("dotenv").config();

import express from "express";
const cors = require("cors");

import { Error } from "mongoose";
const mongoose = require("mongoose");
const notesRoutes = require("./routes/notes");

const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
// app.use(cors(corsOptions));

// Middleware

app.use(express.json(), cors(corsOptions));

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
