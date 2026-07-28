import { showReminderNotification } from "./notificationService";



/**
 * Processa um lembrete individual
 * Decide se deve disparar uma notificação
 */
export function processReminderNotifications(reminder) {


    // Verifica se existe notificação configurada

    if (
        !reminder.notification ||
        !reminder.notification.enabled
    ) {

        return {
            reminder,
            updated: false
        };

    }



    // Verifica se chegou o momento

    if (
        !checkIfShouldNotify(reminder)
    ) {

        return {
            reminder,
            updated: false
        };

    }



    // Evita notificações duplicadas

    if (
        alreadyTriggered(reminder)
    ) {

        return {
            reminder,
            updated: false
        };

    }



    // Dispara a notificação

    sendNotification(reminder);



    // Atualiza estado da notificação

    const updatedReminder =
        updateNotificationState(reminder);



    return {

        reminder: updatedReminder,

        updated: true

    };

}





/**
 * Verifica se o lembrete deve disparar agora
 */
function checkIfShouldNotify(reminder) {


    const notification =
        reminder.notification;



    const now =
        new Date();



    /*
        Primeiro disparo
    */

    if (
        !notification.lastTriggered
    ) {


        const notificationTime =
            calculateNotificationTime(
                reminder
            );



        return (

            now >= notificationTime

            &&

            now < addMinute(notificationTime)

        );

    }




    /*
        Repetições continuam funcionando
    */

    if (
        notification.nextTrigger
    ) {


        return (

            now >=
            new Date(
                notification.nextTrigger
            )

        );

    }



    return false;

}







/**
 * Evita disparar várias vezes
 * no mesmo minuto
 */
function alreadyTriggered(reminder) {


    const lastTriggered =
        reminder.notification.lastTriggered;



    if (
        !lastTriggered
    ) {

        return false;

    }



    const lastDate =
        new Date(lastTriggered);



    const now =
        new Date();



    return (

        lastDate.getFullYear()
        ===
        now.getFullYear()

        &&


        lastDate.getMonth()
        ===
        now.getMonth()


        &&


        lastDate.getDate()
        ===
        now.getDate()


        &&


        lastDate.getHours()
        ===
        now.getHours()


        &&


        lastDate.getMinutes()
        ===
        now.getMinutes()

    );

}








/**
 * Atualiza informações internas
 * após disparar
 */
function updateNotificationState(reminder) {


    const now =
        new Date();



    const notification =
        reminder.notification;



    const history =
        notification.history || [];



    const updatedHistory = [

        ...history,

        {
            triggeredAt:
                now.toISOString()
        }

    ].slice(-20);




    const updatedNotification = {


        ...notification,


        // removendo propriedade antiga

        lastNotification:
            null,


        lastTriggered:
            now.toISOString(),


        history:
            updatedHistory

    };




    if (

        notification.repeat &&

        notification.repeat !== "none"

    ) {


        updatedNotification.nextTrigger =
            calculateNextTrigger(
                now,
                notification.repeat
            );

    }

    else {


        updatedNotification.nextTrigger =
            null;

    }





    return {

        ...reminder,

        notification:
            updatedNotification

    };

}






/**
 * Calcula próximo horário
 * baseado na repetição
 */
function calculateNextTrigger(
    currentDate,
    repeat
) {


    const next =
        new Date(currentDate);




    switch (repeat) {


        case "30m":

            next.setMinutes(
                next.getMinutes() + 30
            );

            break;



        case "1h":

            next.setHours(
                next.getHours() + 1
            );

            break;



        case "2h":

            next.setHours(
                next.getHours() + 2
            );

            break;



        case "4h":

            next.setHours(
                next.getHours() + 4
            );

            break;



        case "6h":

            next.setHours(
                next.getHours() + 6
            );

            break;



        default:

            return null;

    }



    return next.toISOString();

}


function calculateNotificationTime(reminder) {


    const eventDate =
        new Date(
            `${reminder.date}T${reminder.notification.time}`
        );



    const before =
        reminder.notification.before;



    if(
        !before ||
        before === "none"
    ){

        return eventDate;

    }



    switch(before){


        case "5m":

            eventDate.setMinutes(
                eventDate.getMinutes() - 5
            );

            break;



        case "15m":

            eventDate.setMinutes(
                eventDate.getMinutes() - 15
            );

            break;



        case "30m":

            eventDate.setMinutes(
                eventDate.getMinutes() - 30
            );

            break;



        case "1h":

            eventDate.setHours(
                eventDate.getHours() - 1
            );

            break;



        case "1d":

            eventDate.setDate(
                eventDate.getDate() - 1
            );

            break;


    }



    return eventDate;

}





function addMinute(date){


    const newDate =
        new Date(date);



    newDate.setMinutes(
        newDate.getMinutes() + 1
    );



    return newDate;

}





/**
 * Responsável apenas por enviar
 * a notificação visual
 */
function sendNotification(reminder) {


    showReminderNotification({

        title:
            reminder.title,


        description:
            reminder.description

    });

}

