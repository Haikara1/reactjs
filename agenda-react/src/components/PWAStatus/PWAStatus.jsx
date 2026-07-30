import styles from "./PWAStatus.module.css";

import usePWAStatus from "../../hooks/usePWAStatus";


export default function PWAStatus(){


    const {
        isInstalled,
        isOnline
    } = usePWAStatus();



    return (

        <div className={styles.status}>


            <span className={styles.badge}>

                {isOnline
                    ? "🟢 Online"
                    : "🔴 Offline"
                }

            </span>



            <span className={styles.badge}>

                {isInstalled

                    ? "📱 App instalado"

                    : "💻 Navegador"

                }

            </span>


        </div>

    );

}

