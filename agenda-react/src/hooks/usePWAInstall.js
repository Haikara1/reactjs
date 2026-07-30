import { useEffect, useState } from "react";


export default function usePWAInstall() {


    const [installPrompt, setInstallPrompt] = useState(null);

    const [canInstall, setCanInstall] = useState(false);

    const [isInstalling, setIsInstalling] = useState(false);



    useEffect(() => {


        const handleBeforeInstallPrompt = (event) => {


            event.preventDefault();


            setInstallPrompt(event);


            setCanInstall(true);


        };



        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );



        return () => {


            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );


        };


    }, []);




    async function installPWA() {


        if (!installPrompt) {
            return false;
        }


        setIsInstalling(true);
        installPrompt.prompt();


        const result = await installPrompt.userChoice;



        if (result.outcome === "accepted") {

            setCanInstall(false);

        }

        setIsInstalling(false);



        setInstallPrompt(null);


        return result.outcome === "accepted";


    }




    return {

        canInstall,

        installPWA,

        isInstalling

    };


}