import React from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <nav>My nav</nav>
            <main>
                <Outlet />
            </main>
            <footer>My footer</footer>
        </div>
    );
}
