import parseDate from "./parseDate";

function filterRemindersByDate(reminders, selectedDate) {

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    return reminders.filter((reminder) => {

        const reminderDate = parseDate(reminder.date);

        // Mesmo dia/mes/ano
        if (
            reminderDate.getDate() === day &&
            reminderDate.getMonth() === month &&
            reminderDate.getFullYear() === year
        ) {
            return true;
        }

        // Não é recorrente
        if (!reminder.recurring) {
            return false;
        }

        // Mesmo dia e mês, anos seguintes
        return (
            reminderDate.getDate() === day &&
            reminderDate.getMonth() === month &&
            year >= reminderDate.getFullYear()
        );
    });

}

export default filterRemindersByDate;