import styles from './TaskStats.module.css'

function TaskStats({tasks}) {

    const total = tasks.length

    const completed = tasks.filter(
        task => task.completed
    ).length

    const pending = total - completed

    return (
        <div className={styles.stats}>
            <p className={styles.stats_total}>Total: {total}</p>
            <p className={styles.stats_completed}>Concluídas: {completed}</p>
            <p className={styles.stats_pending}>Pendentes: {pending}</p>
        </div>
    )
}

export default TaskStats