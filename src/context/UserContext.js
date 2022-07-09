import React, { useState, useContext } from "react";
import auth0js from "auth0-js";
import axios from "../utils/request";

const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    // const [token, setToken] = useState(sessionStorage.getItem("access_token"));
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("access_token")
    );
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState("");

    const webAuth = new auth0js.WebAuth({
        domain: process.env.REACT_APP_DOMAIN,
        clientID: process.env.REACT_APP_CLIENT_ID,
        // audience: `https://${process.env.REACT_APP_DOMAIN}/api/v2/`,
        audience: process.env.REACT_APP_AUDIENCE,
    });

    React.useEffect(() => {
        let access_token = new URLSearchParams(
            document.location.hash.substring(1)
        ).get("access_token");

        if (access_token) {
            webAuth.client.userInfo(access_token, function (err, user) {
                if (err) return console.log(err);
                getUserDetails(user.sub, access_token);
                return user;
            });

            /* Set is Authenticated and store the access token in session storage */
            sessionStorage.setItem("access_token", access_token);
            setIsAuthenticated(true);
            console.log("access token saved");
        }
    }, []);

    const getUserDetails = async (id, access_token) => {
        // let config = {
        //     headers: {
        //         Authorization: `Bearer ${access_token}`,
        //         "Content-Type": "application/json",
        //     },
        // };
        try {
            // const { data } = await axios.get(
            //     `        http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api/User/${id}
            //         `,
            //     config
            // );
            const { data } = await axios.get(`/User/${id}`);
            setUser(data);
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
                redirectUri: "http://localhost:3000",
                onRedirecting: function (done) {
                    // setIsLoading(false);
                    done();
                },
            },
            (error) => {
                console.log(error);
                setError(error.description);
                // setIsLoading(false);
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
            function (error) {
                if (error) {
                    setError(error.description);
                } else {
                    setSignupSuccess(true);
                }
            }
        );
    };

    const changePassword = (email) => {
        webAuth.changePassword(
            {
                connection: process.env.REACT_APP_REALM,
                email: "nickitest@gmail.com",
            },
            function (err, resp) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(resp);
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
                changePassword,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
