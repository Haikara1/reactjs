import styles from "./ReminderList.module.css"
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
      )?.label
    }

    function getBeforeLabel(value) {

      return notificationBeforeOptions.find(
        option => option.value === value
      )?.label
    }

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

          {
            reminder.notification?.enabled && (

              <>
                <p>
                  <strong>🕘 Horário: </strong>
                  {reminder.notification.time}
                </p>

                {
                  reminder.notification.before !== "0m" &&
                  reminder.notification.before && (

                    <p>
                      <strong>🔔 Primeira Notificação: </strong>
                      {getBeforeLabel(reminder.notification.before)}
                    </p>
                  )
                }

                {
                  reminder.notification.repeat !== "none" && (

                    <p>
                      <strong>🔁 Repetição: </strong>
                      {getNotificationRepeatLabel(reminder.notification.repeat)}
                    </p>
                  )
                }

                {
                reminder.recurring &&
                <p>
                  <strong>🎂 Recorrente</strong>
                </p>
            }

            </>

            )
          }


          <div className={styles.notificationInfo}>

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