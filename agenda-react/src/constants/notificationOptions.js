export const NOTIFICATION_REPEAT = {
    NONE: "none",

    EVERY_30_MINUTES: "30m",

    EVERY_HOUR: "1h",

    EVERY_2_HOURS: "2h",

    EVERY_4_HOURS: "4h",

    EVERY_6_HOURS: "6h"
}

export const notificationRepeatOptions = [

    {
        value: NOTIFICATION_REPEAT.NONE,
        label: "Apenas uma vez."
    },

    {
        value: NOTIFICATION_REPEAT.EVERY_30_MINUTES,
        label: "A cada 30 minutos."
    },

    {
        value: NOTIFICATION_REPEAT.EVERY_HOUR,
        label: "A cada 1 hora."
    },

    {
        value: NOTIFICATION_REPEAT.EVERY_2_HOURS,
        label: "A cada 2 horas."
    },

    {
        value: NOTIFICATION_REPEAT.EVERY_4_HOURS,
        label: "A cada 4 horas."
    },

    {
        value: NOTIFICATION_REPEAT.EVERY_6_HOURS,
        label: "A cada 6 horas."
    }
]