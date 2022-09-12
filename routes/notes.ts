const express = require("express");
import {
  createNote,
  getAllNotes,
  getNote,
  deleteNote,
  updateNote,
  addTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/noteControllers";

const router = express.Router();

// GET all notes
router.get("/", getAllNotes);

// GET a single note
router.get("/:id", getNote);

// POST a new note
router.post("/", createNote);

// DELETE a note
router.delete("/:id", deleteNote);

// UPDATE a note
router.patch("/:id", updateNote);

// POST a new task to a note
router.post("/tasks/:id", addTask);

//UPDATE a task of a note
router.patch("/tasks/:taskId", updateTask);

//DELETE a task of a note
router.delete("/tasks/:taskId", deleteTask);

//GET a single task of a note
router.get("/tasks/:taskId", getTask);

module.exports = router;
