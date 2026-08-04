import {
    getReminders,
    saveReminders
} from "./notificationStorage";

import {
    processReminderNotifications
} from "./notificationEngine";


let schedulerInterval = null;



function runNotificationCycle() {


    const reminders = getReminders();


    let hasChanges = false;


    const updatedReminders =
        reminders.map(reminder => {


            const result =
                processReminderNotifications(
                    reminder
                );


            if(result.updated){

                hasChanges = true;

            }


            return result.reminder;

        });



    if(hasChanges){

        saveReminders(
            updatedReminders
        );

    }

}




function handleVisibilityChange(){


    if(
        document.visibilityState === "visible"
    ){

        console.log(
            "Aplicativo voltou. Verificando notificações..."
        );


        runNotificationCycle();

    }

}





export function startNotificationScheduler(
    interval = 30000
){


    if(schedulerInterval){

        console.warn(
            "Notification Scheduler já está ativo."
        );

        return;

    }


    console.log(
        "Notification Scheduler iniciado."
    );


    // Primeira verificação imediata

    runNotificationCycle();



    schedulerInterval =
        setInterval(()=>{


            runNotificationCycle();


        }, interval);



    document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
    );


}





export function stopNotificationScheduler(){


    if(!schedulerInterval){

        return;

    }


    clearInterval(
        schedulerInterval
    );


    schedulerInterval = null;


    document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
    );


    console.log(
        "Notification Scheduler parado."
    );


}