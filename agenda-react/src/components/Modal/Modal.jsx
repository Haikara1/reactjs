import { useEffect, useState } from "react";

import styles from "./Modal.module.css"
import formatDate from "../../utils/formatDate";

function Modal({ selectedDate, onClose, onSave, selectedReminder, onDelete }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("#6366F1")
    const [recurring, setRecurring] = useState(false)


    useEffect(() => {

    if(selectedReminder){
        setTitle(selectedReminder.title)
        setDescription(selectedReminder.description)
        setColor(selectedReminder.color)
        setRecurring(selectedReminder.recurring ?? false)
    } else {
        setTitle("")
        setDescription("")
        setColor("#6366F1")

    }

}, [selectedReminder])

    if (!selectedDate) return null;

    function handleSave() {
        console.log("Modal recebeu:", selectedDate);
        console.log("Dia recebido:", selectedDate.getDate());
        console.log("Data formatada:", formatDate(selectedDate));
    if (!title.trim()) return;

    const reminder = {
        id: selectedReminder
            ? selectedReminder.id
            : Date.now(),

        date: formatDate(selectedDate),
        title,
        description,
        color,
        recurring
    }

        onSave(reminder)

        setTitle("")
        setDescription("")
        setColor("#6366F1")
        setRecurring(false)
    }

    function handleDelete(){

        if(!selectedReminder) return;

        onDelete(selectedReminder.id);

        onClose();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <h2>
                    {selectedReminder
                        ? "Editar Lembrete"
                        : "Novo Lembrete"
                    }
                </h2>

                <p>
                    Data:
                    {" "}
                    {selectedDate?.toLocaleDateString("pt-BR")}
                </p>

                <label>
                    Título

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex.: Seu Aniversário"
                    />
                </label>

                <label>
                    Descrição

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Digite uma descrição..."
                    />
                </label>

                <label>
                    Cor

                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </label>

                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={recurring}
                        onChange={(e) =>
                            setRecurring(e.target.checked)
                        }
                    />
                    Repetir todos os anos
                </label>

                <div className={styles.buttons}>

                    {selectedReminder && (
                        <button
                            onClick={handleDelete}
                        >
                            Excluir
                        </button>
                    )}

                    <button
                        onClick={handleSave}
                    >
                        {selectedReminder
                            ? "Salvar alterações"
                            : "Salvar"
                        }
                    </button>

                    <button
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                </div>


            </div>

        </div>
    )
}

export default Modal