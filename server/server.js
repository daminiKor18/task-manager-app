const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// LOAD TASKS FROM JSON FILE
let tasks = [];

if(fs.existsSync("tasks.json"))
{
    const data = fs.readFileSync("tasks.json");

    tasks = JSON.parse(data);
}

// SAVE TASKS TO JSON FILE
function saveTasks()
{
    fs.writeFileSync(
        "tasks.json",
        JSON.stringify(tasks, null, 2)
    );
}

// sample route
app.get("/", (req, res) => {

    res.send("Backend Running");

});

// GET tasks
app.get("/tasks", (req, res) => {

    res.json(tasks);

});

// ADD task
app.post("/tasks", (req, res) => {

    const newTask = req.body;

    tasks.push(newTask);

    saveTasks();

    res.json({
        message: "Task added successfully"
    });

});

// DELETE task
app.delete("/tasks/:id", (req, res) => {

    const taskId = Number(req.params.id);

    tasks = tasks.filter(
        (task) => task.id !== taskId
    );

    saveTasks();

    res.json({
        message: "Task deleted successfully"
    });

});

// UPDATE task
app.put("/tasks/:id", (req, res) => {

    const taskId = Number(req.params.id);

    const updatedTask = req.body;

    tasks = tasks.map((task) => {

        if(task.id === taskId)
        {
            return updatedTask;
        }

        return task;

    });

    saveTasks();

    res.json({
        message: "Task updated successfully"
    });

});

// start server
app.listen(5000, () => {

    console.log("Server started on port 5000");

});