import React, { useState, useContext } from "react";
import auth0js from "auth0-js";

const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("access_token"));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const webAuth = new auth0js.WebAuth({
        domain: process.env.REACT_APP_DOMAIN,
        clientID: process.env.REACT_APP_CLIENT_ID,
        //audience: `https://${process.env.REACT_APP_DOMAIN}/api/v2`,
        scope: "read:current_user update:current_user_metadata",
    });

    /* Get token from session storage. If token, set authenticatd. */
    React.useEffect(() => {
        let access_token = new URLSearchParams(
            document.location.hash.substring(1)
        ).get("access_token");
        console.log("access token: ", access_token);
        if (access_token) {
            sessionStorage.setItem("access_token", access_token);
            setIsAuthenticated(true);
        }
    }, []);

    React.useEffect(() => {
        if (!isAuthenticated && token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    const login = (email, password) => {
        setIsLoading(true);
        webAuth.login(
            {
                responseType: "token",
                realm: process.env.REACT_APP_REALM,
                email: "nickitest@gmail.com",
                password: "@Testing1",
                redirectUri: "http://localhost:3000/",
                onRedirecting: function (done) {
                    setIsLoading(false);
                    done();
                },
            },
            (err) => {
                console.log(err);
                setIsLoading(false);
            }
        );
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("access_token");
        webAuth.logout({ returnTo: "http://localhost:3000" });
    };

    //firstname,lastname,email,phoneNumber,address,city,password
    const signup = (userInfo) => {
        const {
            firstname,
            lastname,
            email,
            phoneNumber,
            address,
            city,
            password,
        } = userInfo;
        webAuth.signup(
            {
                connection: process.env.REACT_APP_REALM,
                email,
                password,
                user_metadata: {
                    firstname,
                    lastname,
                    phoneNumber,
                    address,
                    city,
                },
            },
            function (err) {
                if (err) return console.log(err);
                setSignupSuccess(true);
            }
        );
    };

    return (
        <UserContext.Provider
            value={{
                login,
                logout,
                signup,
                signupSuccess,
                isLoading,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
