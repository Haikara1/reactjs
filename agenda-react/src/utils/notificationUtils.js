/*
=========================================================
NOTIFICATION UTILS
---------------------------------------------------------
Responsável por:

✓ Calcular horário do lembrete
✓ Aplicar "antes do evento"
✓ Calcular repetição
✓ Evitar notificações duplicadas
=========================================================
*/

const MINUTE = 60000;

const repeatMap = {
    none: 0,
    "30m": 30,
    "1h": 60,
    "2h": 120,
    "4h": 240,
    "6h": 360
};

const beforeMap = {
    none: 0,
    "5m": 5,
    "10m": 10,
    "15m": 15,
    "30m": 30,
    "1h": 60,
    "2h": 120,
    "1d": 1440
};

/*
=========================================================
Cria a data completa da notificação
=========================================================
*/
export function getReminderDate(reminder) {

    return new Date(
        `${reminder.date}T${reminder.notification.time}`
    );

}

/*
=========================================================
Aplica o tempo "antes do evento"
=========================================================
*/
export function getNotificationDate(reminder) {

    const reminderDate = getReminderDate(reminder);

    const before =
        beforeMap[
            reminder.notification.before
        ] || 0;

    return new Date(
        reminderDate.getTime() -
        before * MINUTE
    );

}

/*
=========================================================
Retorna repetição em minutos
=========================================================
*/
export function getRepeatMinutes(reminder) {

    return (
        repeatMap[
            reminder.notification.repeat
        ] || 0
    );

}

/*
=========================================================
Verifica se já notificou nesse horário
=========================================================
*/
export function alreadyNotified(
    reminder,
    notificationTime
) {

    if (
        !reminder.notification.lastNotification
    ) {

        return false;

    }

    return (
        reminder.notification.lastNotification ===
        notificationTime.toISOString()
    );

}

/*
=========================================================
Marca a notificação como enviada
=========================================================
*/
export function markAsNotified(
    reminder,
    notificationTime
) {

    reminder.notification.lastNotification =
        notificationTime.toISOString();

}

/*
=========================================================
Verifica se está dentro da janela
=========================================================
*/
export function isInsideNotificationWindow(
    notificationTime
) {

    const now = new Date();

    const difference =
        notificationTime.getTime() -
        now.getTime();

    return (
        difference <= 30000 &&
        difference >= -30000
    );

}

/*
=========================================================
Retorna TRUE se ainda pode repetir
=========================================================
*/
export function canRepeat(reminder) {

    return (
        getRepeatMinutes(reminder) > 0
    );

}

/*
=========================================================
Calcula o próximo horário de repetição
=========================================================
*/
export function getNextRepeatDate(
    currentDate,
    reminder
) {

    const minutes =
        getRepeatMinutes(reminder);

    return new Date(
        currentDate.getTime() +
        minutes * MINUTE
    );

}

/*
=========================================================
Evento já terminou?
=========================================================
*/
export function eventFinished(
    reminder
) {

    const reminderDate =
        getReminderDate(reminder);

    return (
        new Date() > reminderDate
    );

}