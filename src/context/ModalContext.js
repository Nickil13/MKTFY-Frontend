import React, { useContext, useState } from "react";
import { useEffect } from "react";

const ModalContext = React.createContext();

export const useModalContext = () => {
    return useContext(ModalContext);
};

export const ModalContextProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertConfirmed, setAlertConfirmed] = useState(false);

    const resetAlert = () => {
        setAlertConfirmed(false);
        setAlertType("");
    };

    const cancelAlert = () => {
        resetAlert();
        setShowAlert(false);
    };

    const confirmAlert = () => {
        setAlertConfirmed(true);
        setShowAlert(false);
    };

    useEffect(() => {
        if (showAlert || showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [showAlert, showModal]);

    return (
        <ModalContext.Provider
            value={{
                showModal,
                setShowModal,
                showAlert,
                setShowAlert,
                setAlertType,
                alertType,
                alertConfirmed,
                cancelAlert,
                confirmAlert,
                resetAlert,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
