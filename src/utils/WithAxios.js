import React from "react";
import { useUserContext } from "../context/UserContext";
import axios from "./request";
import { parseError } from "./helpers";
import { getSessionStorage, STORAGE_KEYS } from "./storageUtils";

export default function WithAxios({ children }) {
    const { logout, setIsLoading } = useUserContext();

    React.useMemo(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = getSessionStorage(STORAGE_KEYS.AUTH_TOKEN, null);
                if (token) {
                    config.headers["Authorization"] = "Bearer " + token;
                }
                setIsLoading(true);
                return config;
            },
            (error) => {
                setIsLoading(false);
                console.log(error);
                Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                setIsLoading(false);
                return response.data;
            },
            (error) => {
                setIsLoading(false);
                console.error(error);

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

                    // Currently parsing based off url not off error message.
                    parseError(error);
                }
            }
        );
    }, []);
    return children;
}
