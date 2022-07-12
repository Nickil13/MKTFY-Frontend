import React from "react";
import { AppBanner, DealsSection, ProductSection } from "../components";

export default function Home() {
    return (
        <div>
            <DealsSection title="Deals for you" category="deals" />
            <div className="flex flex-wrap my-7 flex-grow">
                <ProductSection
                    title="Shop Cars &amp; Vehicles"
                    category="cars"
                    cardLimit="3"
                    margins="mr-5"
                />
                <ProductSection
                    title="Shop Furniture"
                    category="furniture"
                    cardLimit="3"
                />
            </div>
            <DealsSection title="More deals for you" category="more deals" />

            <div className="flex flex-wrap mt-7">
                <ProductSection
                    title="Shop Electronics"
                    category="electronics"
                    cardLimit="3"
                    margins="mr-5"
                />
                <ProductSection
                    title="Shop Real Estate"
                    category="real estate"
                    cardLimit="3"
                />
            </div>
            <AppBanner />
        </div>
    );
}
