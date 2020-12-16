const express = require("express");
const todoRoutes = require("./routes/todo.routes.js");
const app = express();
const mongodb = require("./mongo/mongodb.connect");

mongodb.connect();

app.use(express.json());
app.use("/todos", todoRoutes);
app.use("/getTodos", todoRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({message: error.message});
});

app.get("/", (req, res) => {
    res.json("hello world");
});

module.exports = app;