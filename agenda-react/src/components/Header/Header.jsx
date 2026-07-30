import styles from "./Header.module.css";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import InstallButton from "../InstallButton/InstallButton";
import PWAStatus from "../PWAStatus/PWAStatus";


function Header({ darkMode, onToggleTheme }) {


    return (

        <header className={styles.header}>


                        <div className={styles.brand}>

                <div className={styles.logo}>

                    📅

                </div>


                <div>

                    <h1>
                        Agenda React
                    </h1>


                    <span>
                        Seus lembretes organizados
                    </span>

                </div>


            </div>



            <div className={styles.actions}>


                <PWAStatus />


                <InstallButton />


                <ThemeToggle
                    darkMode={darkMode}
                    onToggleTheme={onToggleTheme}
                />


            </div>


        </header>

    );

}


export default Header;