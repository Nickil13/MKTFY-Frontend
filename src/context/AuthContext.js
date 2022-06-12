import React, { useContext } from "react";

const AuthContext = React.createContext();

export const useAuth = () => {
    return React.useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
