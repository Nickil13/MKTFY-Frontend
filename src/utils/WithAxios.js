import React from "react";
import { useUserContext } from "../context/UserContext";
import axios from "./request";
import { parseError } from "./helpers";

export default function WithAxios({ children }) {
    const { logout } = useUserContext();

    React.useMemo(() => {
        axios.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                console.error(error);
                // parseError(error.message );
                const originalConfig = error.config;
                if (
                    originalConfig.url !== "/login" &&
                    originalConfig.url !== "/" &&
                    !originalConfig.url.includes("marketforyou.us.auth0.com") &&
                    error.response
                ) {
                    // Access token expired
                    if (error.response.status === 401) {
                        // Grab refresh token and use it to get a new accessToken & a new refresh token OR redirect to login
                        console.log("401 error");
                        logout();
                    }
                    if (error.response.status === 400) {
                        // Currently parsing based off url not off error message.
                        parseError(error);
                    }
                }
            }
        );
    }, []);
    return children;
}
