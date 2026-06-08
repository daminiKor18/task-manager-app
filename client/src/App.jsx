import { useState, useEffect } from "react";
import "./App.css";

function App()
{
    // state for tasks
    const [tasks, setTasks] = useState([]);

    // loading + error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // state for inputs
    const [newTask, setNewTask] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    // filter state
    const [filter, setFilter] = useState("All");

    // search state
    const [search, setSearch] = useState("");

    // edit state
    const [editTaskId, setEditTaskId] = useState(null);

    // fetch tasks from backend
    useEffect(() => {

        fetch("https://task-manager-app-jwtv.onrender.com/tasks")
            .then((response) => response.json())
            .then((data) => {

                setTasks(data);

                setLoading(false);

            })
            .catch((error) => {

                console.log(error);

                setError("Failed to load tasks");

                setLoading(false);

            });

    }, []);

    // add or update task
    function addTask()
    {
        if(newTask.trim() === "")
        {
            return;
        }

        // UPDATE TASK
        if(editTaskId !== null)
        {
            const oldTask = tasks.find(
                (task) => task.id === editTaskId
            );

            const updatedTask = {
                ...oldTask,
                title: newTask,
                description: description,
                dueDate: dueDate
            };

            fetch(`https://task-manager-app-jwtv.onrender.com/tasks/${editTaskId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedTask)

            })
            .then(() => {

                const updatedTasks = tasks.map((task) => {

                    if(task.id === editTaskId)
                    {
                        return updatedTask;
                    }

                    return task;
                });

                setTasks(updatedTasks);

                setEditTaskId(null);

                setNewTask("");
                setDescription("");
                setDueDate("");

            })
            .catch((error) => {

                console.log(error);

            });

            return;
        }

        // ADD NEW TASK
        const task = {
            id: Date.now(),
            title: newTask,
            description: description,
            dueDate: dueDate,
            completed: false,
            createdAt: new Date()
        };

        fetch("https://task-manager-app-jwtv.onrender.com/tasks", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(task)

        })
        .then((response) => response.json())
        .then(() => {

            setTasks([task, ...tasks]);

            setNewTask("");
            setDescription("");
            setDueDate("");

        })
        .catch((error) => {

            console.log(error);

        });
    }

    // edit task
    function editTask(task)
    {
        setNewTask(task.title);

        setDescription(task.description);

        setDueDate(task.dueDate);

        setEditTaskId(task.id);
    }

    // delete task
    function deleteTask(id)
    {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete?"
        );

        if(!confirmDelete)
        {
            return;
        }

        fetch(`https://task-manager-app-jwtv.onrender.com/tasks/${id}`, {

            method: "DELETE"

        })
        .then(() => {

            const updatedTasks = tasks.filter(
                (task) => task.id !== id
            );

            setTasks(updatedTasks);

        })
        .catch((error) => {

            console.log(error);

        });
    }

    // toggle status
    function toggleTask(id)
    {
        const updatedTasks = tasks.map((task) => {

            if(task.id === id)
            {
                const updatedTask = {
                    ...task,
                    completed: !task.completed
                };

                fetch(`https://task-manager-app-jwtv.onrender.com/tasks/${id}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedTask)

                });

                return updatedTask;
            }

            return task;

        });

        setTasks(updatedTasks);
    }

    // counts
    const activeCount = tasks.filter(
        (task) => !task.completed
    ).length;

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    // filter + search tasks
    const filteredTasks = tasks.filter((task) => {

        // SEARCH FILTER
        const matchesSearch =
            task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        // ACTIVE FILTER
        if(filter === "Active")
        {
            return !task.completed && matchesSearch;
        }

        // COMPLETED FILTER
        if(filter === "Completed")
        {
            return task.completed && matchesSearch;
        }

        // ALL
        return matchesSearch;
    });

    // sort newest first
    const sortedTasks = [...filteredTasks].sort(
        (a, b) => b.id - a.id
    );

    return (
        <div className="container">

            <h1>Task Manager</h1>

            {/* loading */}
            {
                loading &&
                <h2>Loading tasks...</h2>
            }

            {/* error */}
            {
                error &&
                <h2>{error}</h2>
            }

            {/* counts */}
            <div className="count-section">

                <p>Active Tasks: {activeCount}</p>

                <p>Completed Tasks: {completedCount}</p>

            </div>

            {/* input section */}
            <div className="input-section">

                <input
                    type="text"
                    placeholder="Enter task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <button onClick={addTask}>

                    {
                        editTaskId !== null
                        ? "Update Task"
                        : "Add Task"
                    }

                </button>

            </div>

            {/* SEARCH BAR */}
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br />
            <br />

            {/* filter buttons */}
            <div className="filter-section">

                <button onClick={() => setFilter("All")}>
                    All
                </button>

                <button onClick={() => setFilter("Active")}>
                    Active
                </button>

                <button onClick={() => setFilter("Completed")}>
                    Completed
                </button>

            </div>

            {/* empty state */}
            {
                !loading &&
                sortedTasks.length === 0
                ? (
                    <h2 className="no-task">
                        No Tasks Available
                    </h2>
                )
                : (
                    sortedTasks.map((task) => {

                        const isOverdue =
                            !task.completed &&
                            task.dueDate &&
                            new Date(task.dueDate) < new Date();

                        return (

                            <div
                                className={
                                    isOverdue
                                    ? "task-card overdue"
                                    : "task-card"
                                }
                                key={task.id}
                            >

                                <h3>{task.title}</h3>

                                <p>{task.description}</p>

                                <p>
                                    Due Date: {task.dueDate}
                                </p>

                                <p className={
                                    task.completed
                                    ? "completed"
                                    : "pending"
                                }>
                                    {
                                        task.completed
                                        ? "Completed"
                                        : "Pending"
                                    }
                                </p>

                                {
                                    isOverdue &&
                                    <p className="overdue-text">
                                        Overdue Task
                                    </p>
                                }

                                <div className="button-group">

                                    <button
                                        onClick={() => toggleTask(task.id)}
                                    >
                                        Toggle Status
                                    </button>

                                    <button
                                        onClick={() => editTask(task)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        );

                    })
                )
            }

        </div>
    );
}

export default App;