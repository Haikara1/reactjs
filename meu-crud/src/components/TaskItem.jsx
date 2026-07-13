import { useState } from 'react'
import styles from './TaskItem.module.css'



function TaskItem({ task, completeTask, removeTask, editTask }) {
    console.log(completeTask)

    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(task.title)
    const [oldTitle, setOldTitle] = useState(task.title)


    console.log(task)


    return (
    <div className={styles.task}>

        <div className={styles.content}>

            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => completeTask(task.id)}
            />

            {isEditing ? (
                <input
                    className={styles.editInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            ) : (
                <h3 className={task.completed ? styles.completed : ""}>
                    {task.title}
                </h3>
            )}

        </div>


        <div className={styles.actions}>

            {isEditing ? (
                <>
                    <button
                        className={styles.save}
                        onClick={() => {
                            editTask(task.id, title)
                            setIsEditing(false)
                        }}
                    >
                        Salvar
                    </button>


                    <button
                        className={styles.cancel}
                        onClick={() => {
                            setTitle(oldTitle)
                            setIsEditing(false)
                        }}
                    >
                        Cancelar
                    </button>
                </>
            ) : (
                <>
                    <button
                        className={styles.edit}
                        onClick={() => {
                            setOldTitle(task.title)
                            setIsEditing(true)
                        }}
                    >
                        Editar
                    </button>


                    <button
                        className={styles.remove}
                        onClick={() => removeTask(task.id)}
                    >
                        Remover
                    </button>
                </>
            )}

        </div>

    </div>
)

}

export default TaskItem