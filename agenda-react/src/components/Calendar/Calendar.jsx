import styles from "./Calendar.module.css";
import { generateCalendar } from "../../utils/generateCalendar";

import CalendarDay from "../CalendarDay/CalendarDay";

function Calendar({
  reminders,
  onSelectDate,
  currentDate,
  onNextMonth,
  onPreviousMonth,
  onToday
}) {

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();

    const today = new Date();

    const { firstWeekDay, totalDays } =
     generateCalendar(year, month);


  return (
    <section className={styles.calendar}>

      <div className={styles.header}>

        <button
            className={styles.navButton}
            onClick={onPreviousMonth}
        >
            ◀
        </button>

        <h2>
            {currentDate.toLocaleDateString(
                "pt-BR",
                {
                    month: "long",
                    year: "numeric"
                }
            )}
        </h2>

        <button
            className={styles.navButton}
            onClick={onNextMonth}
        >
            ▶
        </button>

        <button
            className={styles.todayButton}
            onClick={onToday}
        >
            Hoje
        </button>
      </div>


      <div className={styles.weekdays}>
        <span>Dom</span>
        <span>Seg</span>
        <span>Ter</span>
        <span>Qua</span>
        <span>Qui</span>
        <span>Sex</span>
        <span>Sáb</span>
      </div>


      <div className={styles.grid}>


        {[...Array(firstWeekDay)].map((_, index) => (
          <div
            key={`empty-${index}`}
            className={styles.empty}
          />
        ))}



        {[...Array(totalDays)].map((_, index) => {

          const day = index + 1;


          const isToday =
            day === today.getDate();



          const currentDate = new Date(
            year,
            month,
            day
          )
          .toISOString()
          .split("T")[0];



          const remindersOfDay = reminders.filter(
            reminder => reminder.date === currentDate
          );



          return (

            <CalendarDay
              key={day}
              day={day}
              isToday={isToday}
              reminders={remindersOfDay}

              onClick={() => {

                const date = new Date(
                  year,
                  month,
                  day
                );


                onSelectDate(date);

              }}
            />

          );


        })}


      </div>


    </section>
  );
}

export default Calendar;