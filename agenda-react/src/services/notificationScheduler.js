import {
    getReminders,
    saveReminders
} from "./notificationStorage";

import {
    processReminderNotifications
} from "./notificationEngine";


let schedulerInterval = null;


/**
 * Inicia o Scheduler
 */
export function startNotificationScheduler(
    interval = 30000
) {

    // Evita múltiplos schedulers rodando
    if (schedulerInterval) {
        console.warn(
            "Notification Scheduler já está ativo."
        );

        return;
    }


    console.log(
        "Notification Scheduler iniciado."
    );


    schedulerInterval = setInterval(() => {

        runNotificationCycle();

    }, interval);

}



/**
 * Executa um ciclo de verificação
 */
function runNotificationCycle() {

    const reminders = getReminders();


    let hasChanges = false;


    const updatedReminders = reminders.map(
        reminder => {

            const result =
                processReminderNotifications(
                    reminder
                );


            if (result.updated) {
                hasChanges = true;
            }


            return result.reminder;

        }
    );


    if (hasChanges) {

        saveReminders(
            updatedReminders
        );

    }

}



/**
 * Para o Scheduler
 */
export function stopNotificationScheduler() {

    if (!schedulerInterval) {
        return;
    }


    clearInterval(
        schedulerInterval
    );


    schedulerInterval = null;


    console.log(
        "Notification Scheduler parado."
    );

}