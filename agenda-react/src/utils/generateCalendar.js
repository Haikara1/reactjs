export function generateCalendar(year, month) {

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstWeekDay = firstDay.getDay()
    const totalDays = lastDay.getDate()

    return {
        firstWeekDay,

        totalDays
    }
}