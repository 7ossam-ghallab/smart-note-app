import { deleteNoteService } from "../services/notes/delete-note.js";
import { addNoteService } from "../services/notes/insert-note.js";
import { summarizeNoteService } from "../services/notes/summarize-note.js";

export const addNote = async (req, res) => {
  try {
    const note = await addNoteService({ ...req.body, ownerId: req.user._id });
    res.status(201).json({ message: "Note created successfully", note });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await deleteNoteService({ id : req.params.id, ownerId : req.user._id});
    res.status(200).json({ message: "Note deleted successfully", note });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

export const summarizeNote = async (req, res) => {
  try {
    const summarize_note = await summarizeNoteService({ id : req.params.id});
    console.log(summarize_note)
    res.status(200).json({ message: "Note Summarized successfully", summarize_note });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}
