import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function RequireAuth({ children }) {
    const { isAuthenticated } = useAuth0();
    console.log(`Is Authenticated: ${isAuthenticated}`);
    let auth = true;
    let location = useLocation();

    if (!auth) {
        console.log("failed to log in");
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}
