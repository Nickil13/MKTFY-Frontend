import React, { useState, useContext } from "react";
import auth0js from "auth0-js";

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

    console.log("rerendered");
    const webAuth = new auth0js.WebAuth({
        domain: process.env.REACT_APP_DOMAIN,
        clientID: process.env.REACT_APP_CLIENT_ID,
        // audience: `https://${process.env.REACT_APP_DOMAIN}/api/v2/`,
        // scope: "read:current_user",
    });

    /* Get token from session storage. If token, set authenticated. */
    React.useEffect(() => {
        // webAuth.checkSession(
        //     {
        //         audience: `https://dev-9rx0zj33.us.auth0.com/api/v2/`,
        //         responseType: "token id_token",
        //         redirectUri: "http://localhost:3000",
        //         scope: "read:current_user",
        //     },
        //     function (err, result) {
        //         // use result.accessToken
        //         var auth0Manage = new auth0js.Management({
        //             domain: process.env.REACT_APP_DOMAIN,
        //             token: result.accessToken,
        //         });

        //         console.log(auth0Manage);

        //         return console.log(err, result);
        //     }
        // );

        let access_token = new URLSearchParams(
            document.location.hash.substring(1)
        ).get("access_token");

        if (access_token) {
            webAuth.parseHash(
                { hash: window.location.hash },
                function (err, authResult) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(authResult);

                    var auth0Manage = new auth0js.Management({
                        domain: process.env.REACT_APP_DOMAIN,
                        token: authResult.accessToken,
                    });
                    webAuth.client.userInfo(
                        authResult.accessToken,
                        function (err, user) {
                            if (err) return console.log(err);

                            auth0Manage.getUser(
                                user.sub,
                                function (err, result) {
                                    if (err) return console.log(err);
                                    return console.log(result);
                                }
                            );
                            return console.log(user);
                        }
                    );
                    // webAuth.client.userInfo(
                    //     authResult.accessToken,
                    //     function (err, user) {
                    //         // Now you have the user's information
                    //         if (err) {
                    //             return console.log(err);
                    //         }
                    //         // console.log(user.sub.split("|"[1]))
                    //         // auth0Manage.getUser(
                    //         //     "auth0|62b8182548b94e0a9efbf9fc",
                    //         //     (res) => {
                    //         //         console.log(res);
                    //         //     }
                    //         // );
                    //         // console.log(user1);
                    //         return console.log(user);
                    //     }
                    // );
                }
            );
        }

        // let access_token = new URLSearchParams(
        //     document.location.hash.substring(1)
        // ).get("access_token");

        // if (access_token) {
        //     sessionStorage.setItem("access_token", access_token);
        //     setIsAuthenticated(true);
        //     console.log("access token saved");
        // }
    }, []);

    const login = (email, password) => {
        webAuth.login(
            {
                responseType: "token",
                realm: process.env.REACT_APP_REALM,
                email: "nickitest@gmail.com",
                password: "@Testing1",
                // audience: `https://${process.env.REACT_APP_DOMAIN}/api/v2/`,
                redirectUri: "http://localhost:3000/",
                // scope: "read:current_user",
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

    //firstname,lastname,email,phoneNumber,address,city,password
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
        console.log(userInfo);
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
