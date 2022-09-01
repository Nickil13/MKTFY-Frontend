import React from "react";
import { useUserContext } from "../context/UserContext";
import axios from "./request";
import { parseError } from "./helpers";
import { getSessionStorage, STORAGE_KEYS } from "./storageUtils";
import { useListingContext } from "../context/ListingContext";

export default function WithAxios({ children }) {
    const { logout } = useUserContext();
    const { setLoading } = useListingContext();

    React.useMemo(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = getSessionStorage(STORAGE_KEYS.AUTH_TOKEN, null);
                if (token) {
                    config.headers["Authorization"] = "Bearer " + token;
                }
                setLoading(true);
                return config;
            },
            (error) => {
                setLoading(false);
                console.log(error);
                Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                setLoading(false);
                return response.data;
            },
            (error) => {
                setLoading(false);
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
