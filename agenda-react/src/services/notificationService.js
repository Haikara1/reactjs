function isSupported() {
    return "Notification" in window;
}

async function requestPeremission() {

    if(!isSupported()) {
        return false;
    }

    if(Notification.permission === "granted") {
        return true;
    }

    if(Notification.permission === "denied") {
        return false;
    }

    const permission = await Notification.requestPermission();
}

function showReminderNotification(reminder) {

    console.log(
        "REMINDER RECEBIDO:",
        reminder
    )


    if(!("Notification" in window)) {
        console.log("Navegador não suporta notificações")
        return
    }


    new Notification(
        reminder.title || "Lembrete",
        {
            body:
                reminder.description ||
                "Você possui um lembrete.",

            icon: "/logo192.png"
        }
    )
}

// function showReminderNotification(reminder) {
//     if(!("Notification" in window)) {
//         console.log("Navegador não suporta notificações")
//         return
//     }

//     if(!reminder) {
//         console.log("Nenhum Lembrete recebido")
//         return
//     }

//     new Notification(
//         reminder.title || "Lembrete",
//         {
//             body: reminder.description || "Você possui um lembrete.",
//             icon: "/logo192.png"
//         }
//     )
// }

export {
    isSupported,
    requestPeremission,
    showReminderNotification
}