const TodoController = require("../../controllers/todocontroller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo");
const allTodos = require("../mock-data/all-todos");

jest.mock("../../model/todo.model");

let req, res, next;
const todoId = "5d5ecb5a6e598605f06cb945";
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("TodoController.deleteTodo", () => {
    it("should have a deleteTodo function", () => {
      expect(typeof TodoController.deleteTodo).toBe("function");
    });
    it("should call findByIdAndDelete", async () => {
      req.params.todoId = todoId;
      await TodoController.deleteTodo(req, res, next);
      expect(TodoModel.findByIdAndDelete).toBeCalledWith(todoId);
    });
    it("should return 200 OK and deleted todomodel", async () => {
      TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
      await TodoController.deleteTodo(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newTodo);
      expect(res._isEndCalled()).toBeTruthy();
    });
    it("should handle errors", async () => {
      const errorMessage = { message: "Error deleting" };
      const rejectedPromise = Promise.reject(errorMessage);
      TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
      await TodoController.deleteTodo(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should handle 404", async () => {
      TodoModel.findByIdAndDelete.mockReturnValue(null);
      await TodoController.deleteTodo(req, res, next);
      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });
  

describe("TodoController.updateTodo", () => {
    it("should have a updateTodo function", () => {
      expect(typeof TodoController.updateTodo).toBe("function");
    });
    
    it("should update with TodoModel.findByIdAndUpdate", async () => {
      req.params.todoId = todoId;
      req.body = newTodo;
      await TodoController.updateTodo(req, res, next);
  
      expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
        new: true,
        useFindAndModify: false
      });
    });

    it("should return a response with json data and http code 200", async () => {
      req.params.todoId = todoId;
      req.body = newTodo;
      TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
      await TodoController.updateTodo(req, res, next);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it("should handle errors", async () => {
      const errorMessage = { message: "Error" };
      const rejectedPromise = Promise.reject(errorMessage);
      TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
      await TodoController.updateTodo(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });
  });
  

describe("TodoController.getTodosbyID", () => {
    it("should have a getTodoById function", () => {
        expect(typeof TodoController.getTodoById).toBe("function");
    });
    it("should call TodoModel.findById", () => {
        const idToUse = "5fda7401fae49b425cb220f9";
        req.params.todoId = idToUse;
        TodoController.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith(idToUse);
    })
    
    it("should return json body in response", async () => {
        TodoModel.findById.mockReturnValue(newTodo);
        await TodoController.getTodoById(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Unable to find data." };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await TodoController.getTodoById(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });

    it("should return 404 when item does not exist", async () => {
        TodoModel.findById.mockReturnValue(undefined);
        await TodoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

});

describe("TodoController.getTodos", () => {
    it("should have a getTodo function", () => {
        expect(typeof TodoController.getTodos).toBe("function");
    });
    it("should call TodoModel.find", () => {
        TodoController.getTodos(req, res, next);
        expect(TodoModel.find).toBeCalled();
    })
    
    it("should return 200 response code", async () => {
        await TodoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await TodoController.getTodos(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Unable to find data." };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await TodoController.getTodos(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });

});


describe("TodoController.createTodo", () => {
    beforeEach(() => {
        req.body = newTodo;
    });

    it("should have a createTodo function", () => {
        expect(typeof TodoController.createTodo).toBe("function");
    });

    it("should call TodoModel.create", () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    })

    it("should return 201 response code", async () => {
        await TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", async () => {
        TodoModel.create.mockReturnValue(newTodo);
        await TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Missing some stuff in the request." };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await TodoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
