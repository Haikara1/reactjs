function generateCalendar(year, month) {

    const firstDay = new Date(
        year,
        month,
        1
    );

    const lastDay = new Date(
        year,
        month + 1,
        0
    );


    const firstWeekDay = firstDay.getDay();

    const totalDays = lastDay.getDate();


    const calendar = [];


    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < firstWeekDay; i++) {

        calendar.push(null);

    }


    // Dias do mês
    for (let day = 1; day <= totalDays; day++) {

        calendar.push(
            new Date(
                year,
                month,
                day
            )
        );

    }


    return calendar;

}


export default generateCalendar;