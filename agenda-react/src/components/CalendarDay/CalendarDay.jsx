import styles from "./CalendarDay.module.css";

function CalendarDay({ day, isToday, reminders, onClick }) {

  const style = reminders?.length
    ? {
        backgroundColor: reminders[0].color,
        color: "#fff",
        border: "none",
      }
    : {};

  return (
    <button
      className={`${styles.day} ${
        isToday ? styles.today : ""
      }`}
      style={style}
      onClick={onClick}
    >

      <span>{day}</span>

      {reminders?.length > 0 && (
        <small>
          {reminders.length} lembrete(s)
        </small>
      )}

    </button>
  );
}

export default CalendarDay;