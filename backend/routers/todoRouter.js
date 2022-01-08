import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import TodoModal from "../modals/Todos.js";
import { isAuth } from "../utils.js";

const todoRouter = express.Router();

todoRouter.get(
  "/seeds",
  expressAsyncHandler(async (req, res) => {
    const createTodo = await TodoModal.insertMany(data.todos);
    res.send(createTodo);
  })
);
todoRouter.get(
  "/todos",
  expressAsyncHandler(async (req, res) => {
    try {
      const result = await TodoModal.find();
      res.send(result);
    } catch (error) {
      console.log("Todo not found");
    }
  })
);

todoRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    try {
      const todo = new TodoModal({
        title: req.body.title,
        description: req.body.description,
      });
      await todo.save();
      res.send({
        message: "Todo Added Successfully",
      });
    } catch (error) {
      res.send({
        message: "Invalid Todo",
      });
    }
  })
);

todoRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const todo = await TodoModal.findById(req.params.id);
    if (todo) {
      const deletedTodo = await todo.remove();
      res.send({ message: "Todo Deleted", todo: deletedTodo });
    } else {
      res.status(404).send({ message: "Todo Not Found" });
    }
  })
);

todoRouter.put(
  "/edit",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const todo = await TodoModal.findById(req.body._id);
    if (todo) {
      (todo.title = req.body.title || todo.title),
        (todo.description = req.body.description || todo.description);
    }
    const updatedTodo = await todo.save();
    res.send({
      _id: updatedTodo._id,
      title: updatedTodo.title,
      description: updatedTodo.description,
    });
  })
);
export default todoRouter;
