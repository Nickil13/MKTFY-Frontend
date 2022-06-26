import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function RequireAuth({ children }) {
    const { isLoading, isAuthenticated } = useUserContext();
    let location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        console.log("failed to log in");
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}
