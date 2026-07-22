import styles from "./Header.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Header({ darkMode, onToggleTheme }) {
    return (
        <header className={styles.header}>
            <h1>
                Agenda React
            </h1>

            <ThemeToggle
                darkMode={darkMode}
                onToggleTheme={onToggleTheme}
            />
        </header>
    );
}

export default Header;