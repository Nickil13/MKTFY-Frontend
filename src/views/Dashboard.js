import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";

export default function Dashboard() {
    return (
        <div>
            <nav className="h-[191px] bg-purple-500">
                <div className="max-w-[1636px] bg-purple-200 mx-auto">
                    {/* logo */}
                    {/* search toolbar: search, categories, city dropdown */}
                    {/* user dropdown */}
                    {/* alert icon */}
                    {/* create listing icon*/}
                </div>
            </nav>
            <main className="relative bg-gray-cloud-gray h-screen">
                <div className="absolute inset-0 bg-gray-clouds"></div>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
