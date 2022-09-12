const mongoose = require("mongoose");

const Schemma = mongoose.Schema;

type Tasks = {
  _id?: string;
  titleTask: string;
  descriptionTask: string;
};

export interface INotesSchema {
  title: string;
  date: Date;
  description: number;
  tasks: Tasks[];
}

const noteSchema: INotesSchema = new Schemma(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    tasks: [
      {
        titleTask: { type: String, required: false },
        descriptionTask: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
