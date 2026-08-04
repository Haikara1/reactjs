import styles from "./ReminderList.module.css";

import { notificationBeforeOptions } from "../../constants/notificationBeforeOptions";
import { notificationRepeatOptions } from "../../constants/notificationOptions";

function ReminderList({
    reminders,
    onEdit,
    onDelete,
    onNew
}) {

    function getNotificationRepeatLabel(value) {

        return notificationRepeatOptions.find(
            option => option.value === value
        )?.label;

    }

    function getBeforeLabel(value) {

        return notificationBeforeOptions.find(
            option => option.value === value
        )?.label;

    }

    return (

        <section className={styles.list}>

            <h2 className={styles.title}>

                📅 Lembretes do dia

            </h2>

            {

                reminders.map((reminder) => (

                    <article
                        key={reminder.id}
                        className={styles.item}
                    >

                        <div className={styles.content}>

                            <div className={styles.header}>

                                <span
                                    className={styles.color}
                                    style={{
                                        background: reminder.color
                                    }}
                                />

                                <h3>

                                    {reminder.title}

                                </h3>

                            </div>

                            {

                                reminder.description && (

                                    <p className={styles.description}>

                                        {reminder.description}

                                    </p>

                                )

                            }

                            {

                                reminder.notification?.enabled && (

                                    <div className={styles.notificationInfo}>

                                        <p>

                                            <strong>🕘 Horário:</strong>{" "}
                                            {reminder.notification.time}

                                        </p>

                                        {

                                            reminder.notification.before !== "0m" &&
                                            reminder.notification.before && (

                                                <p>

                                                    <strong>🔔 Primeira notificação:</strong>{" "}

                                                    {getBeforeLabel(
                                                        reminder.notification.before
                                                    )}

                                                </p>

                                            )

                                        }

                                        {

                                            reminder.notification.repeat !== "none" && (

                                                <p>

                                                    <strong>🔁 Repetição:</strong>{" "}

                                                    {getNotificationRepeatLabel(
                                                        reminder.notification.repeat
                                                    )}

                                                </p>

                                            )

                                        }

                                        {

                                            reminder.recurring && (

                                                <p>

                                                    <strong>

                                                        🎂 Evento recorrente

                                                    </strong>

                                                </p>

                                            )

                                        }

                                    </div>

                                )

                            }

                        </div>

                        <div className={styles.actions}>

                            <button
                                onClick={() => onEdit(reminder)}
                            >

                                ✏️ Editar

                            </button>

                            <button
                                onClick={() => onDelete(reminder.id)}
                            >

                                🗑️ Excluir

                            </button>

                        </div>

                    </article>

                ))

            }

            <button
                className={styles.newButton}
                onClick={onNew}
            >

                ➕ Novo lembrete

            </button>

        </section>

    );

}

export default ReminderList;