import { useState } from "react"

function Condicional() {

    const [email, setEmail] = useState()
    const [userEmail, setUserEmail] = useState()

    function enviarEmail(e) {
        e.preventDefault()
        setUserEmail(email)
        console.log(userEmail)
    }

    function limparEmail() {
        setUserEmail('')

    }


    return (
        <div>
            <h2>Cadastre o seu E-mail:</h2>
            <form>
                <input type="email" placeholder="Digite o seu e-mail..." onChange={(e) => setEmail(e.target.value)}></input>
                <button type="submit" onClick={enviarEmail}>Enviar e-mail</button>
                {userEmail && (
                    <div>
                        <p>O e-mail do usuário é: {userEmail}</p>
                        <button onClick={limparEmail}>Limpar E-mail</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Condicional