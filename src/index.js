import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { ModalContextProvider } from "./context/ModalContext";
import { UserContextProvider } from "./context/UserContext";
import WithAxios from "./utils/WithAxios";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <UserContextProvider>
        <WithAxios>
            <ModalContextProvider>
                <App />
            </ModalContextProvider>
        </WithAxios>
    </UserContextProvider>
);
