import styles from "./Header.module.css"
import ThemeToggle from "../ThemeToggle/ThemeToggle"

function Header() {
    return(
        <header className={styles.header}>
            <h1>Agenda React</h1>
        </header>
    )
}

export default Header