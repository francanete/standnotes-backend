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

interface IGetNoteIDRequest {
  params: {
    id: string;
  };
}

export const getNote = async (req: IGetNoteIDRequest, res: Response) => {
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

export const deleteNote = async (req: IGetNoteIDRequest, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Specified id is not valid" });
  }

  const note = await Note.findByIdAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ msg: "Note not found" });
  }

  res.status(200).json(note);
};

// UPDATE a note

interface IUpdateNoteRequest {
  params: {
    id: string;
  };
  body: INotesSchema;
}

export const updateNote = async (req: IUpdateNoteRequest, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Specified id is not valid" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    return res.status(404).json({ msg: "Note not found" });
  }

  res.status(200).json(note);
};

// POST a new task to a note
export const addTask = async (req: IUpdateNoteRequest, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout exists" });
  }

  const note = await Note.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        tasks: req.body.tasks,
      },
    }
  );

  if (!note) {
    return res.status(400).json({ error: "Note not found" });
  }

  res.status(200).json(note);
};

// UPDATE a task in a note

interface IUpdateTask {
  params: {
    taskId: string;
  };
  body: INotesSchema;
}

export const updateTask = async (req: IUpdateTask, res: Response) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(404).json({ error: "No such TASK exists" });
  }

  const update = req.body.tasks;

  update[0].titleTask;

  const note = await Note.findOneAndUpdate(
    {
      "tasks._id": taskId,
    },
    {
      $set: {
        "tasks.$.titleTask": update[0].titleTask,
        "tasks.$.descriptionTask": update[0].descriptionTask,
      },
    }
  );

  if (!note) {
    return res.status(400).json({ error: "Note not found" });
  }

  res.status(200).json(note);
};

// DELETE a task from a note

export const deleteTask = async (req: IUpdateTask, res: Response) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(404).json({ error: "No such TASK exists" });
  }

  const note = await Note.findOneAndUpdate(
    {
      "tasks._id": taskId,
    },
    {
      $pull: {
        tasks: { _id: taskId },
      },
    }
  );

  if (!note) {
    return res.status(400).json({ error: "Note not found" });
  }

  res.status(200).json(note);
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
  addTask,
  updateTask,
  deleteTask,
};
