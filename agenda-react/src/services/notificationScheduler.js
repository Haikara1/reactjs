import { showReminderNotification } from "./notificationService";

export function startNotificationScheduler() {

    setInterval(() => {

        const savedReminders = localStorage.getItem("reminders")

        if(!savedReminders) return

        const reminders = JSON.parse(savedReminders)

        reminders.forEach(reminder => {
            checkReminder(reminder)
        });

    }, 30000)

}

function checkReminder(reminder) {

    if(!reminder.notification?.enabled) {
        return;
    }

    const now = new Date()

    const reminderDate = new Date(
        `${reminder.date}T${reminder.notification.time}`
    )

    const difference = reminderDate - now;

    if(difference <= 30000 && difference > 0) {
        showReminderNotification(reminder)
    }

}

function verifyReminder(reminder){

    console.log(
        "VERIFICANDO:",
        reminder
    )


    if(!reminder.notification?.enabled){
        return;
    }

  
}

export {

}