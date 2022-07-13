import React, { useState, useContext } from "react";
import auth0js from "auth0-js";
import axios from "../utils/request";
import jwt_decode from "jwt-decode";

const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
                    // getUserDetails(user.sub);
                    // getUserDetails().then((user) => {
                    //     setUser(user);
                    // });
                    getUserDetails();
                }

                return;
            });
        }
    }, []);

    const getUserDetails = async () => {
        const token = sessionStorage.getItem("access_token");
        const decoded = jwt_decode(token);

        try {
            const res = await axios.get(`/User/${decoded.sub}`);
            setUser(res);
            // return res;
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

    const login = (email, password) => {
        error && setError("");
        webAuth.login(
            {
                responseType: "token",
                realm: process.env.REACT_APP_REALM,
                email,
                password,
                redirectUri: "http://localhost:3000/login",
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
        webAuth.logout({ returnTo: "http://localhost:3000" });
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
                getUserDetails,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
