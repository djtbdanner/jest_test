const express = require("express");
const todoRoutes = require("./routes/todo.routes.js");
const app = express();

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
    console.log("hello")
    res.json("hello world");
});

app.listen (3000, () =>{
    console.log("running on 3000");
});

module.exports = app;