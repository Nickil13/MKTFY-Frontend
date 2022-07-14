import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import jwtDecode from "jwt-decode";

export default function RequireAuth({ children }) {
    const { isLoading, isAuthenticated, logout } = useUserContext();
    let location = useLocation();

    React.useEffect(() => {
        console.log("Checking token lifetime");
        const token = sessionStorage.getItem("access_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    console.log("token expired");
                    logout();
                } else {
                    console.log("Token still active.");
                }
            } catch (error) {
                console.log(error);
                logout();
            }
        }
    }, [location]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}
