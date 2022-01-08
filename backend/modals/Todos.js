import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  complete: { type: Boolean, default: false, required: true },
});

const TodoModal = mongoose.model("todo", todoSchema);

export default TodoModal;
