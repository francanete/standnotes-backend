const express = require("express");
import {
  createNote,
  getAllNotes,
  getNote,
} from "../controllers/noteControllers";

const router = express.Router();

// GET all notes
router.get("/", getAllNotes);

// GET a single note
router.get("/:id", getNote);

// POST a new note
router.post("/", createNote);

// DELETE a note
router.delete("/:id", (req: any, res: any) => {
  res.json({ mssg: "DELETE a note" });
});

// UPDATE a note
router.patch("/:id", (req: any, res: any) => {
  res.json({ mssg: "UPDATE a note" });
});

module.exports = router;
