import React, { useState, useContext, useEffect } from "react";
import auth0js from "auth0-js";
import axios from "../utils/request";
import jwt_decode from "jwt-decode";
import {
    clearLocalStorage,
    getLocalStorage,
    setLocalStorage,
    STORAGE_KEYS,
} from "../utils/storageUtils";
import { toast } from "../components/custom-toast/CustomToastContainer";

// const REDIRECT_URI = "http://localhost:3000";
const REDIRECT_URI = "http://mktfy-lp.s3-website.ca-central-1.amazonaws.com";
const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(
        getLocalStorage(STORAGE_KEYS.USER_KEY, null)
    );
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("access_token")
    );
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState("");

    const webAuth = new auth0js.WebAuth({
        domain: process.env.REACT_APP_DOMAIN,
        clientID: process.env.REACT_APP_CLIENT_ID,
        audience: process.env.REACT_APP_AUDIENCE,
    });

    /* Check if token is expired, if so, set Authenticated to false. */
    React.useEffect(() => {
        let access_token = new URLSearchParams(
            document.location.hash.substring(1)
        ).get("access_token");

        if (access_token) {
            /* Set is Authenticated and store the access token in session storage */
            sessionStorage.setItem("access_token", access_token);
            setIsAuthenticated(true);
            console.log("access token saved");

            /* Decode token to get user information */
            webAuth.client.userInfo(access_token, function (err, user) {
                if (err) return console.log(err);
                let newUserDetails = JSON.parse(
                    sessionStorage.getItem("user_details")
                );

                if (newUserDetails) {
                    createUser(user.sub, newUserDetails);
                } else {
                    getCurrentUserDetails();
                }

                return;
            });
        }
    }, []);

    /* Store changes made to user in local storage */
    useEffect(() => {
        if (user) {
            setLocalStorage(STORAGE_KEYS.USER_KEY, { ...user });
        }
    }, [user]);

    /* User API Functionality */
    const getIdFromToken = () => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            const decoded = jwt_decode(token);
            return decoded.sub;
        }
        return;
    };
    const getCurrentUserDetails = async () => {
        const userId = getIdFromToken();

        try {
            const res = await axios.get(`/User/${userId}`);
            setUser(res);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserDetails = async (id) => {
        try {
            const res = await axios.get(`/User/${id}`);
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const createUser = async (id, userDetails) => {
        const body = { ...userDetails, id };
        try {
            const res = await axios.post("/User", body);
            setUser(res);
            sessionStorage.removeItem("user_details");
        } catch (error) {
            console.log(error);
        }
    };

    const editUser = async (userDetails) => {
        const userId = getIdFromToken();
        const body = { ...userDetails, id: userId };

        try {
            const res = await axios.put("/User", body);
            setUser(res);

            toast.success("User info saved!");
        } catch (error) {
            toast.error("Error: did not save user info.");
        }
    };

    /* Auth0 Functionality */
    const login = (email, password) => {
        error && setError("");
        webAuth.login(
            {
                responseType: "token",
                realm: process.env.REACT_APP_REALM,
                email,
                password,
                redirectUri: `${REDIRECT_URI}/login`,
                onRedirecting: function (done) {
                    done();
                },
            },
            (error) => {
                console.log(error);
                setError(error.description);
            }
        );
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("access_token");
        clearLocalStorage();
        webAuth.logout({ returnTo: REDIRECT_URI });
    };

    const signup = (userInfo) => {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            password,
        } = userInfo;

        error && setError("");
        webAuth.signup(
            {
                connection: process.env.REACT_APP_REALM,
                email,
                password,
                user_metadata: {
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    city,
                },
            },
            async function (error, res) {
                if (error) {
                    setError(error.description);
                    console.log(error);
                } else {
                    console.log(res);
                    const body = {
                        firstName,
                        lastName,
                        email,
                        phone: phoneNumber,
                        address,
                        city,
                    };
                    /* Save the user signup details for when the user logs in for the first time. Then add them to API database (since we can't do it here without a token). */
                    sessionStorage.setItem(
                        "user_details",
                        JSON.stringify(body)
                    );
                    login(email, password);
                    setSignupSuccess(true);
                }
            }
        );
    };

    const changePassword = (email) => {
        webAuth.changePassword(
            {
                connection: process.env.REACT_APP_REALM,
                email,
            },
            function (err, resp) {
                if (err) {
                    toast.error(err.message);
                } else {
                    toast.success(resp);
                }
            }
        );
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                logout,
                signup,
                signupSuccess,
                isLoading,
                isAuthenticated,
                error,
                setError,
                getCurrentUserDetails,
                editUser,
                changePassword,
                getUserDetails,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
