import styles from "./CalendarDay.module.css";

function CalendarDay({
    day,
    isToday,
    reminders,
    onClick
}) {

    const hasReminder = reminders?.length > 0;

    const style = hasReminder
        ? {
            backgroundColor: reminders[0].color,
            color: "#ffffff",
            border: "none"
        }
        : {};

    return (

        <button
            type="button"
            className={`
                ${styles.day}
                ${isToday ? styles.today : ""}
            `}
            style={style}
            onClick={onClick}
            aria-label={`Dia ${day}${
                hasReminder
                    ? ` com ${reminders.length} lembrete(s)`
                    : ""
            }`}
        >

            <span className={styles.dayNumber}>
                {day}
            </span>

            {
                hasReminder && (

                    <div className={styles.badge}>

                        <span
                            className={styles.dot}
                        />

                        <small>

                            {reminders.length}

                        </small>

                    </div>

                )
            }

        </button>

    );

}

export default CalendarDay;