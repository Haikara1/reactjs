import styles from './TaskList.module.css'

import TaskItem from './TaskItem'

function TaskList({ tasks, completeTask, removeTask, editTask }) {
console.log(tasks)


    return(<>
        <h2>Lista de tarefas</h2>

        {tasks.map(task => (
            <TaskItem
                key={task.id}
                task={task}
                completeTask={completeTask}
                removeTask={removeTask}
                editTask={editTask}
            />
        ))}


    </>)

}

export default TaskList