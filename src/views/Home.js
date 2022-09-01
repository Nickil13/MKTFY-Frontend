import React from "react";
import { AppBanner, DealsSection, ProductSection } from "../components";
import { useListingContext } from "../context/ListingContext";

export default function Home() {
    const { listingSelection, getListingSelection, deals, getDeals } =
        useListingContext();

    React.useEffect(() => {
        if (!listingSelection) {
            /* Get a selection of listings: 3 from each category*/
            getListingSelection();
        }
        if (deals.length === 0) {
            getDeals();
        }
    }, []);
    return (
        <div>
            <DealsSection title="Deals for you" category="deals" />
            <div className="flex flex-wrap my-7 2xl:grid 2xl:grid-cols-2 2xl:gap-5">
                <ProductSection
                    title="Shop Cars &amp; Vehicles"
                    category="cars"
                />
                <ProductSection title="Shop Furniture" category="furniture" />
            </div>
            {deals.length > 8 && (
                <DealsSection
                    title="More deals for you"
                    category="more deals"
                />
            )}

            <div className="flex flex-wrap mt-7 2xl:grid 2xl:grid-cols-2 2xl:gap-5">
                <ProductSection
                    title="Shop Electronics"
                    category="electronics"
                />
                <ProductSection
                    title="Shop Real Estate"
                    category="real estate"
                />
            </div>
            <AppBanner />
        </div>
    );
}
