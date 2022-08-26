import { Response } from "express";
import mongoose from "mongoose";
import { INotesSchema } from "../models/noteModel";

const Note = require("../models/noteModel");

// GET all notes
interface INoteRequest {
  body: INotesSchema;
}

export const getAllNotes = async (req: INoteRequest, res: Response) => {
  const notes = await Note.find({}).sort({ date: -1 });
  res.status(200).json(notes);
};

// GET a single note

interface IGetNoteRequest {
  params: {
    id: string;
  };
}

export const getNote = async (req: IGetNoteRequest, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Specified id is not valid" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ msg: "Note not found" });
  }

  res.status(200).json(note);
};

// POST a new note

export const createNote = async (req: INoteRequest, res: Response) => {
  const { title, date, description, tasks } = req.body;

  try {
    const note = await Note.create({
      title,
      date,
      description,
      tasks,
    });

    res.status(200).json(note);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      console.log("Unknown error", error);
    }
  }
};

// DELETE a note

// UPDATE a note

module.exports = {
  getAllNotes,
  getNote,
  createNote,
};
