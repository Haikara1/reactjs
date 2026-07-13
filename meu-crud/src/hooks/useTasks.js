import { useState, useEffect, use } from "react";

function useTasks() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks")

        return savedTasks
            ? JSON.parse(savedTasks)
            : []
    })

    useEffect(() => {
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        )
    }, [tasks])

    function addTask(text) {
        const newTask = {
            id: Date.now(),
            title: text,
            completed: false
        }

        setTasks([...tasks, newTask])
    }

    function completeTask(id) {
        setTasks(
            tasks.map((task) =>
                task.id === id
                ? {
                    ...task,
                    completed: !task.completed
                }
                : task
            )
        )
    }


    function removeTask(id) {
        setTasks(
            tasks.filter(
                (task) => task.id !== id
            )
        )
    }

    function editTask(id, newTitle) {
        setTasks(
            tasks.map((task) =>
                task.id === id
                ? {
                    ...task,
                    title: newTitle
                }
                : task
            )
        )
    }

    return {
        tasks,
        addTask,
        completeTask,
        removeTask,
        editTask
    }
}

export default useTasks