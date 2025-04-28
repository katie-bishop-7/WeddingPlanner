import { useEffect, useState } from "react";
import cookie from "cookie";
import "./PageTaskList.css";

export function PageTaskList() {

    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState("");
    const [due_date, setDueDate] = useState("");
    const [notes, setNotes] = useState([]);
    // const [taskList, setTaskList] = useState([]);


    async function createTask(e) {
        e.preventDefault();
        const res = await fetch("/task_list/", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
            },
            body: JSON.stringify({
                title,
                description,
                due_date,
            }),
        })
        const body = res.json()
        setNotes(... notes, body.notes)

    }

    async function getTasks(){
        const res = await fetch("/task_list/", {
            method: "GET",
            credentials: "same-origin",

        })
        const body = await res.body()
        setNotes(body.notes)
    }

    return (
        <>
            <h1>Task List</h1>
            <form onSubmit={createTask} class="task-list-form flex flex-col justify-between align-center">
                <label>
                    <div>Title</div>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required></input>
                </label>
                <label>
                    <div>Description</div>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} id="description" required></input>
                    </label>
                <label>
                    <div>Due Date</div>
                    <input type="date" onChange={(e) => setDueDate(e.target.value)}value={due_date} required></input>
                    </label>
                <button type="submit">Add</button>
            </form>
        </>
    );
};
