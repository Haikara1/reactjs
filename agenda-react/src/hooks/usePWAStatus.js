import { useEffect, useState } from "react";

export default function usePWAStatus() {

    const [isInstalled, setIsInstalled] = useState(
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    );

    const [isOnline, setIsOnline] = useState(
        navigator.onLine
    );


    useEffect(() => {


        const handleOnline = () => {
            setIsOnline(true);
        };


        const handleOffline = () => {
            setIsOnline(false);
        };


        window.addEventListener(
            "online",
            handleOnline
        );


        window.addEventListener(
            "offline",
            handleOffline
        );


        return () => {

            window.removeEventListener(
                "online",
                handleOnline
            );


            window.removeEventListener(
                "offline",
                handleOffline
            );

        };


    }, []);



    useEffect(() => {

        const mediaQuery = window.matchMedia(
            "(display-mode: standalone)"
        );


        const handleChange = () => {

            setIsInstalled(
                mediaQuery.matches
            );

        };


        mediaQuery.addEventListener(
            "change",
            handleChange
        );

        const handleInstalled = () => {

            setIsInstalled(true);

        };


        window.addEventListener(
            "appinstalled",
            handleInstalled
        );

        return () => {

            mediaQuery.removeEventListener(
                "change",
                handleChange
            );


            window.removeEventListener(
                "appinstalled",
                handleInstalled
            );

        };


    }, []);



    return {

        isInstalled,
        isOnline

    };

}