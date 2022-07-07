import React, { useState, useContext } from "react";
import auth0js from "auth0-js";
import axios from "axios";

const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    // const [token, setToken] = useState(sessionStorage.getItem("access_token"));
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("access_token")
    );
    const [isLoading, setIsLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState("");

    console.log("rerendered");
    const webAuth = new auth0js.WebAuth({
        domain: process.env.REACT_APP_DOMAIN,
        clientID: process.env.REACT_APP_CLIENT_ID,
        // audience: `https://${process.env.REACT_APP_DOMAIN}/api/v2/`,
        audience: "http://marketforyou.com",

        // scope: "read:current_user update:current_user_metadata",
    });

    /* Get token from session storage. If token, set authenticatd. */
    React.useEffect(() => {
        let access_token = new URLSearchParams(
            document.location.hash.substring(1)
        ).get("access_token");

        console.log("access token: ", access_token);
        // checkApi(access_token);

        if (access_token) {
            sessionStorage.setItem("access_token", access_token);
            setIsAuthenticated(true);
        }
    }, []);

    // function checkApi(access_token) {
    async function checkApi(access_token) {
        console.log("access token: ", access_token);

        // try {
        //     const res = await axios.get(
        //         `http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api/Listing/all`,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${access_token}`,
        //             },
        //         }
        //     );
        //     console.log(res);
        // } catch (error) {
        //     console.log(error);
        // }
        let header = new Headers({
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
        });
        fetch(
            `http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api/Listing/all`,
            {
                headers: header,
                mode: "no-cors",
            }
        )
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    }

    // React.useEffect(() => {
    //     if (!isAuthenticated && token) {
    //         setIsAuthenticated(true);
    //     }
    // }, [token]);

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
            (error) => {
                console.log(error);
                setError(error.description);
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
            function (error) {
                if (error) {
                    setError(error.description);
                } else {
                    setSignupSuccess(true);
                }
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
                error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
