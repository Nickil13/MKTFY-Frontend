import React, { useContext, useState } from "react";

const ModalContext = React.createContext();

export const useModalContext = () => {
    return React.useContext(ModalContext);
};

export const ModalContextProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <ModalContext.Provider value={{ showModal, setShowModal }}>
            {children}
        </ModalContext.Provider>
    );
};
