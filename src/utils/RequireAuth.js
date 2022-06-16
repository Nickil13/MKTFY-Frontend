import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
    let auth = true;
    let location = useLocation();

    if (!auth) {
        console.log("failed to log in");
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
}
