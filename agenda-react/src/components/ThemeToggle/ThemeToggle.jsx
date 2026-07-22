import styles from "./ThemeToggle.module.css";

import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle({ darkMode, onToggleTheme }) {
    return (
        <button
            className={`${styles.toggle} ${
                darkMode ? styles.dark : styles.light
            }`}
            onClick={onToggleTheme}
            aria-label={
                darkMode
                    ? "Ativar tema claro"
                    : "Ativar tema escuro"
            }
        >
            <span className={styles.icon}>
                {darkMode ? (
                    <FiSun size={22}/>
                ) : (
                    <FiMoon size={22}/>
                )}
            </span>
        </button>
    );
}

export default ThemeToggle;