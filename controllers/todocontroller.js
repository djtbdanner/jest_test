const { create } = require("../model/todo.model");
const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (error) {
        next(error);
    }
};

exports.getTodos = async (req, res, next) => {
    try {
        const toDos = await TodoModel.find({});
        res.status(200).json(toDos);
    } catch (error) {
        next(error);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const id = req.params.todoId;
        const toDo = await TodoModel.findById(id);
        if (toDo) {
            res.status(200).json(toDo);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};


exports.updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            {
                new: true,
                useFindAndModify: false
            }
        );
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        console.log("Error updating todo " + err.message);
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
      const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
  
      if (deletedTodo) {
        res.status(200).json(deletedTodo);
      } else {
        res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  };