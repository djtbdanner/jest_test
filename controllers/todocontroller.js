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
        res.status(200).json(toDo);
    } catch (error) {
        next(error);
    }
};
