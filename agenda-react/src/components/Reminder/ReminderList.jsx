import styles from "./ReminderList.module.css"

function ReminderList({
  reminders,
  onEdit,
  onDelete,
  onNew
}) {

  return (
    <div className={styles.list}>

      {reminders.map((reminder)=>(

        <div
          key={reminder.id}
          className={styles.item}
        >

          <div>
            <h3>
              {reminder.title}
            </h3>

            <p>
              {reminder.description}
            </p>
          </div>


          <div>

            <button
              onClick={() => onEdit(reminder)}
            >
              Editar
            </button>


            <button
              onClick={() => onDelete(reminder.id)}
            >
              Excluir
            </button>

            <button
                onClick={onNew}
                className={styles.newButton}
            >
              + Novo lembrete
            </button>

          </div>


        </div>

      ))}

    </div>
  );
}

export default ReminderList