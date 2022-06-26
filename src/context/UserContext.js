import React, { useContext } from "react";
import auth0js from "auth0-js";

const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    const webAuth = new auth0js.WebAuth({
        domain: process.env.REACT_APP_DOMAIN,
        clientID: process.env.REACT_APP_CLIENT_ID,
    });

    const login = (username, password) => {
        webAuth.login({
            responseType: "token",
            realm: "Username-Password-Authentication",
            email: "nickitest@gmail.com",
            password: "@Testing1",
            redirectUri: "http://localhost:3000",
        });
    };

    const logout = () => {
        webAuth.logout({ returnTo: "http://localhost:3000" });
    };

    const signup = (
        firstname,
        lastname,
        email,
        phoneNumber,
        address,
        city,
        password
    ) => {
        webAuth.signup(
            {
                connection: "Username-Password-Authentication",
                email: "nickitest@gmail.com",
                password: "@Test1",
                username: "nicki test",
                given_name: "nicki",
                family_name: "lindstrom test",
            },
            function (err) {
                if (err) return alert("Something went wrong: ", +err.message);
            }
        );
    };

    return (
        <UserContext.Provider value={{ login, logout, signup }}>
            {children}
        </UserContext.Provider>
    );
};
