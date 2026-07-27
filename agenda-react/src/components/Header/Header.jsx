import styles from "./Header.module.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { showReminderNotification } from "../../services/notificationService";

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
            <button
                onClick={() => showReminderNotification({
                    title: "Agenda React",
                    description: "Teste de notificação"
                }
                )}
            >
                Testar Notificação
            </button>
        </header>
    );
}

export default Header;