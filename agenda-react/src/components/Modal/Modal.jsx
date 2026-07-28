import { useEffect, useState } from "react";

import styles from "./Modal.module.css";

import formatDate from "../../utils/formatDate";

import {
    notificationRepeatOptions
} from "../../constants/notificationOptions";

import {
    notificationBeforeOptions
} from "../../constants/notificationBeforeOptions";

const DEFAULT_COLOR = "#6366F1";

const DEFAULT_NOTIFICATION = {
    enabled: false,
    time: "09:00",
    before: "0m",
    repeat: "none",
    lastNotification: null
};

function Modal({
    selectedDate,
    onClose,
    onSave,
    selectedReminder,
    onDelete
}) {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [color, setColor] = useState(DEFAULT_COLOR);

    const [recurring, setRecurring] = useState(false);

    const [notificationEnabled, setNotificationEnabled] =
        useState(DEFAULT_NOTIFICATION.enabled);

    const [notificationTime, setNotificationTime] =
        useState(DEFAULT_NOTIFICATION.time);

    const [notificationBefore, setNotificationBefore] =
        useState(DEFAULT_NOTIFICATION.before);

    const [notificationRepeat, setNotificationRepeat] =
        useState(DEFAULT_NOTIFICATION.repeat);

    useEffect(() => {

        if (selectedReminder) {

            setTitle(selectedReminder.title);

            setDescription(selectedReminder.description);

            setColor(selectedReminder.color);

            setRecurring(
                selectedReminder.recurring ?? false
            );

            const notification = {

                ...DEFAULT_NOTIFICATION,

                ...selectedReminder.notification

            };

            setNotificationEnabled(
                notification.enabled
            );

            setNotificationTime(
                notification.time
            );

            setNotificationBefore(
                notification.before
            );

            setNotificationRepeat(
                notification.repeat
            );

        } else {

            resetForm();

        }

    }, [selectedReminder]);

    function resetForm() {

        setTitle("");

        setDescription("");

        setColor(DEFAULT_COLOR);

        setRecurring(false);

        setNotificationEnabled(
            DEFAULT_NOTIFICATION.enabled
        );

        setNotificationTime(
            DEFAULT_NOTIFICATION.time
        );

        setNotificationBefore(
            DEFAULT_NOTIFICATION.before
        );

        setNotificationRepeat(
            DEFAULT_NOTIFICATION.repeat
        );

    }

    function buildReminder() {

        return {

            id:
                selectedReminder?.id ??
                Date.now(),

            date:
                formatDate(selectedDate),

            title,

            description,

            color,

            recurring,

            notification: {

                enabled:
                    notificationEnabled,

                time:
                    notificationTime,

                before:
                    notificationBefore,

                repeat:
                    notificationRepeat,

                lastNotification:
                    selectedReminder
                        ?.notification
                        ?.lastNotification
                    ?? null

            }

        };

    }

    function handleSave() {

        if (!title.trim()) {
            return;
        }

        const reminder =
            buildReminder();

        onSave(reminder);

        resetForm();

    }

    function handleDelete() {

        if (!selectedReminder) {
            return;
        }

        onDelete(
            selectedReminder.id
        );

        onClose();

    }

    if (!selectedDate) {
        return null;
    }

    return (
        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2>

                    {
                        selectedReminder
                            ? "Editar Lembrete"
                            : "Novo Lembrete"
                    }

                </h2>

                <p>

                    Data{" "}
                    {selectedDate.toLocaleDateString(
                        "pt-BR"
                    )}

                </p>

                <label>

                    Título

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Ex.: Seu Aniversário"
                    />

                </label>

                <label>

                    Descrição

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        placeholder="Digite uma descrição..."
                    />

                </label>

                <label>

                    Cor

                    <input
                        type="color"
                        value={color}
                        onChange={(e) =>
                            setColor(e.target.value)
                        }
                    />

                </label>
                                <label className={styles.checkbox}>

                    <input
                        type="checkbox"
                        checked={recurring}
                        onChange={(e) =>
                            setRecurring(
                                e.target.checked
                            )
                        }
                    />

                    Repetir todos os anos

                </label>

                <hr />

                <h3>
                    🔔 Notificações
                </h3>

                <label className={styles.checkbox}>

                    <input
                        type="checkbox"
                        checked={notificationEnabled}
                        onChange={(e) =>
                            setNotificationEnabled(
                                e.target.checked
                            )
                        }
                    />

                    Ativar notificações

                </label>

                {
                    notificationEnabled && (

                        <>

                            <label>

                                Horário

                                <input
                                    type="time"
                                    value={notificationTime}
                                    onChange={(e) =>
                                        setNotificationTime(
                                            e.target.value
                                        )
                                    }
                                />

                            </label>

                            <label>

                                Primeira notificação

                                <select
                                    value={notificationBefore}
                                    onChange={(e) =>
                                        setNotificationBefore(
                                            e.target.value
                                        )
                                    }
                                >

                                    {
                                        notificationBeforeOptions.map(
                                            (option) => (

                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>

                                            )
                                        )
                                    }

                                </select>

                            </label>

                            <label>

                                Repetir

                                <select
                                    value={notificationRepeat}
                                    onChange={(e) =>
                                        setNotificationRepeat(
                                            e.target.value
                                        )
                                    }
                                >

                                    {
                                        notificationRepeatOptions.map(
                                            (option) => (

                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>

                                            )
                                        )
                                    }

                                </select>

                            </label>

                        </>

                    )
                }

                <div className={styles.buttons}>

                    {
                        selectedReminder && (

                            <button
                                onClick={handleDelete}
                            >
                                Excluir
                            </button>

                        )
                    }

                    <button
                        onClick={handleSave}
                    >

                        {
                            selectedReminder
                                ? "Salvar alterações"
                                : "Salvar"
                        }

                    </button>

                    <button
                        onClick={() => {

                            resetForm();

                            onClose();

                        }}
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Modal;