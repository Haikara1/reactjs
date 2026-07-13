import { useState } from "react"

function TaskForm({addTask}) {
    const [text, setText] = useState('')

    function submit(e) {
        e.preventDefault()

        if(text.trim() === '') {
            return
        }

        addTask(text)

        setText('')
    }

    return(
        <form onSubmit={submit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
             />
            <button>Adicionar</button>
            <p>{text}</p>

        </form>
    )

}

export default TaskForm