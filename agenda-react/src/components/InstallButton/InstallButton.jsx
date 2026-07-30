import usePWAInstall from "../../hooks/usePWAInstall";
import styles from "./InstallButton.module.css";


export default function InstallButton() {


    const {

        canInstall,

        installPWA,

        isInstalling

    } = usePWAInstall();


    if (!canInstall) {
        return null;
    }



    return (

        <button

            className={styles.button}

            onClick={installPWA}

            disabled={isInstalling}

            aria-label="Instalar aplicativo Agenda React"

        >


            {isInstalling

                ? "⏳ Instalando..."

                : "📲 Instalar"

            }


        </button>

    );

}