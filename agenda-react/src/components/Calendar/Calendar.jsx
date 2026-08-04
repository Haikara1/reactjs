import styles from "./Calendar.module.css";

import generateCalendar from "../../utils/generateCalendar";
import filterRemindersByDate from "../../utils/filterRemindersByDate";

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

    const calendar = generateCalendar(year, month);

    const monthName = currentDate.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    const today = new Date();

    return (

        <section className={styles.calendar}>

            <header className={styles.header}>

                <button
                    className={styles.navButton}
                    onClick={onPreviousMonth}
                    aria-label="Mês anterior"
                >
                    ←
                </button>

                <h2>
                    {monthName}
                </h2>

                <button
                    className={styles.navButton}
                    onClick={onNextMonth}
                    aria-label="Próximo mês"
                >
                    →
                </button>

                <button
                    className={styles.todayButton}
                    onClick={onToday}
                    aria-label="Ir para o mês atual"
                >
                    Hoje
                </button>

            </header>

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

                {calendar.map((date, index) => {

                    if (!date) {

                        return (
                            <div
                                key={index}
                                className={styles.empty}
                            />
                        );

                    }

                    const remindersOfDay =
                        filterRemindersByDate(
                            reminders,
                            date
                        );

                    const isToday =
                        date.toDateString() ===
                        today.toDateString();

                    return (

                        <CalendarDay
                            key={date.toISOString()}
                            day={date.getDate()}
                            reminders={remindersOfDay}
                            isToday={isToday}
                            onClick={() =>
                                onSelectDate(date)
                            }
                        />

                    );

                })}

            </div>

        </section>

    );

}

export default Calendar;