function isSupported() {

    return (
        "Notification" in window &&
        "serviceWorker" in navigator
    );

}

async function requestPermission() {

    if (!isSupported()) {
        console.log("Notificações não suportadas.");
        return false;
    }

    if (Notification.permission === "granted") {
        console.log("Permissão já concedida.");
        return true;
    }

    if (Notification.permission === "denied") {
        console.log("Permissão negada.");
        return false;
    }

    const permission =
        await Notification.requestPermission();

    console.log(
        "Resultado da permissão:",
        permission
    );

    return permission === "granted";

}

async function showReminderNotification(reminder) {

    console.log("================================");
    console.log("INICIANDO TESTE DE NOTIFICAÇÃO");
    console.log("Reminder:", reminder);

    console.log(
        "Notification.permission:",
        Notification.permission
    );

    console.log(
        "navigator.serviceWorker:",
        navigator.serviceWorker
    );

    if (!isSupported()) {

        console.error(
            "Este navegador não suporta notificações."
        );

        return;

    }

    if (Notification.permission !== "granted") {

        console.error(
            "Permissão não concedida."
        );

        return;

    }

    try {

        console.log(
            "Aguardando Service Worker..."
        );

        const registration =
            await navigator.serviceWorker.ready;

        console.log(
            "Service Worker pronto:",
            registration
        );

        await registration.showNotification(

            reminder.title || "Lembrete",

            {

                body:
                    reminder.description ||
                    "Você possui um lembrete.",

                icon: "./icon-192.png",

                badge: "./icon-192.png",

                vibrate: [200, 100, 200],

                tag: "agenda-react"

            }

        );

        console.log(
            "✅ NOTIFICAÇÃO ENVIADA COM SUCESSO"
        );

    }
    catch (error) {

        console.error(
            "❌ ERRO AO ENVIAR NOTIFICAÇÃO"
        );

        console.error(error);

    }

}

export {

    isSupported,

    requestPermission,

    showReminderNotification

};