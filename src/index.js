import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { ModalContextProvider } from "./context/ModalContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <UserContextProvider>
        <ModalContextProvider>
            <App />
        </ModalContextProvider>
    </UserContextProvider>
);
