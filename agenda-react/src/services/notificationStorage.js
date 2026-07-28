/*
==========================================================
Notification Storage
----------------------------------------------------------
Responsável por:

✓ Ler lembretes do LocalStorage
✓ Salvar lembretes
✓ Atualizar um lembrete específico
✓ Buscar lembretes ativos
==========================================================
*/

const STORAGE_KEY = "reminders";

/*
==========================================================
Retorna todos os lembretes
==========================================================
*/
export function getReminders() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [];
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "[NotificationStorage] Erro ao ler LocalStorage.",
            error
        );

        return [];

    }

}

/*
==========================================================
Salva todos os lembretes
==========================================================
*/
export function saveReminders(reminders) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reminders)
    );

}

/*
==========================================================
Atualiza apenas um lembrete
==========================================================
*/
export function updateReminder(updatedReminder) {

    const reminders =
        getReminders();

    const updated =
        reminders.map(reminder =>

            reminder.id === updatedReminder.id
                ? updatedReminder
                : reminder

        );

    saveReminders(updated);

}

/*
==========================================================
Retorna apenas lembretes
com notificações ativas
==========================================================
*/
export function getActiveReminders() {

    return getReminders().filter(reminder =>

        reminder.notification?.enabled

    );

}

/*
==========================================================
Retorna um lembrete pelo ID
==========================================================
*/
export function getReminderById(id) {

    return getReminders().find(

        reminder => reminder.id === id

    );

}