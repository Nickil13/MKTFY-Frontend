import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { ModalContextProvider } from "./context/ModalContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
        domain={process.env.REACT_APP_DOMAIN}
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={window.location.origin}
    >
        <UserContextProvider>
            <ModalContextProvider>
                <App />
            </ModalContextProvider>
        </UserContextProvider>
    </Auth0Provider>
);
