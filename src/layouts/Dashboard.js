import React from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { BreadCrumbs } from "../components";
import { Navbar, Footer } from "../components";
import Loader from "../components/Loader";
import { useListingContext } from "../context/ListingContext";
import { useUserContext } from "../context/UserContext";
import { generateCrumbs } from "../utils/helpers";

export default function Dashboard() {
    const { isLoading } = useUserContext();
    const { currentListing } = useListingContext();
    let location = useLocation();
    let [searchParams] = useSearchParams();
    let crumbs = generateCrumbs(location, searchParams, currentListing);

    return (
        <div className="relative min-h-screen pb-footer-mobile md:pb-footer-mid lg:pb-footer-desktop">
            {isLoading && <Loader />}
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
