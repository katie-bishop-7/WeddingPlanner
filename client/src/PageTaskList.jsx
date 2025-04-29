import { useEffect, useState } from "react";
import * as cookie from "cookie";
import "./PageTaskList.css";

export function PageTaskList() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [due_date, setDueDate] = useState("");
    const [tasks, setTasks] = useState([]);
    // const [taskList, setTaskList] = useState([]);


    async function createTask(e) {
        e.preventDefault();
        const res = await fetch("task_list/", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
            },
            body: JSON.stringify({
                name,
                description,
                due_date,
                completed: false,
            }),
        });
        const body = await res.json(); // Await the response JSON
        setTasks([...tasks, body.task]); // Add the new task object directly
    }

    async function getTasks() {
        const res = await fetch("/task_list/", {
            credentials: "same-origin",
        })
        const body = await res.json();
        setTasks(body.tasks || []);
    }

    async function completeTask(task) {
        await fetch(`/task_list/${task.id}/`, {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
            },
            body: JSON.stringify({
                ...task,
                completed: !task.completed,
            }),
        });
        setTasks(tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)));
    }

    useEffect(() => {
        getTasks()
    }
        , [])

    return (
        <>
            <h1>Task List</h1>
            <div className="flex flex-row align-top space-evenly justify-center" id="container">
                <form onSubmit={createTask} className="task-list-form flex flex-col justify-between align-center">
                    <label>
                        <div>Title</div>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} required></input>
                    </label>
                    <label>
                        <div>Description</div>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} id="description" required></textarea>
                    </label>
                    <label>
                        <div>Due Date</div>
                        <input type="date" onChange={(e) => setDueDate(e.target.value)} value={due_date} required></input>
                    </label>
                    <button type="submit">Add</button>
                </form>

                <div className="task-list-container flex flex-col justify-between align-center">
                    {tasks.map((task) => (
                        <div key={task.id} className="task-list-item flex flex-row justify-between align-center">
                            <div className="flex flex-row align-center">
                                <div className="task-list-item-checkbox">
                                    <input type="checkbox" checked={task.completed} onChange={() => completeTask(task)}></input>
                                </div>
                                <div className="task-list-item-title">{task.name}</div>
                            </div>
                            <div className="task-list-item-due-date">{task.due_date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
