import React, { useContext } from "react";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
    return <UserContext.Provider>{children}</UserContext.Provider>;
};
