import React from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { BreadCrumbs } from "../components";
import { Navbar, Footer } from "../components/layout";
import { useListingContext } from "../context/ListingContext";
import { generateCrumbs } from "../utils/helpers";

export default function Dashboard() {
    const { currentListing, loading } = useListingContext();
    let location = useLocation();
    let [searchParams] = useSearchParams();
    let crumbs = generateCrumbs(location, searchParams, currentListing);

    return (
        <div className="relative min-h-screen pb-footer-mobile md:pb-footer-mid lg:pb-footer-desktop">
            {loading && (
                <div className="fixed inset-0 z-[99999] bg-[#000000]/10 flex items-center justify-center">
                    <div className="w-[100px] h-[100px] rounded-full bg-purple-600 text-[4rem] text-white text-center">
                        ...
                    </div>
                </div>
            )}
            <Navbar />
            <main className="relative bg-gray-cloud-gray min-h-screen pt-mobile-nav lg:pt-nav">
                <div className="min-h-screen bg-gray-clouds bg-cover bg-fixed bg-center bg-no-repeat pt-8 pb-32">
                    <div className="container">
                        <BreadCrumbs crumbs={crumbs} />
                        <Outlet />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
