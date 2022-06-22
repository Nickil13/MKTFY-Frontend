import React from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { BreadCrumbs } from "../components";
import Footer from "../components/layout/Footer";
import { generateCrumbs } from "../utils/helpers";

export default function Dashboard() {
    let location = useLocation();
    let [searchParams] = useSearchParams();
    let crumbs = generateCrumbs(location, searchParams);

    return (
        <div className="relative min-h-screen pb-footer">
            <nav className="h-[191px] bg-purple-500">
                <div className="max-w-[1636px] bg-purple-200 mx-auto">
                    {/* logo */}
                    {/* search toolbar: search, categories, city dropdown */}
                    {/* user dropdown */}
                    {/* alert icon */}
                    {/* create listing icon*/}
                </div>
            </nav>
            <main className="relative bg-gray-cloud-gray min-h-screen">
                <div className="min-h-screen bg-gray-clouds bg-cover bg-fixed bg-center bg-no-repeat pt-8 pb-32 px-[142px]">
                    <BreadCrumbs crumbs={crumbs} />
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}
