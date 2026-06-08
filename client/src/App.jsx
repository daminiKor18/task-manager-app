import { useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function addTask() {
        const task = {
            id: Date.now(),
            title: newTask
        };

        setTasks([...tasks, task]);
        setNewTask("");
    }

    return (
        <div>
            <h1>Task Manager</h1>

            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />

            <button onClick={addTask}>Add</button>

            {tasks.map(t => (
                <p key={t.id}>{t.title}</p>
            ))}
        </div>
    );
}

export default App;