import React from "react";
import { AppBanner, CardSection, DealsSection } from "../components";

export default function Home() {
    return (
        <div className="pt-8 pb-32 px-[142px]">
            <DealsSection title="Deals for you" category="deals" />
            <div className="flex flex-wrap my-7 flex-grow">
                <CardSection
                    title="Shop Cars &amp; Vehicles"
                    category="cars"
                    cardLimit="3"
                    margins="mr-5"
                />
                <CardSection
                    title="Shop Furniture"
                    category="furniture"
                    cardLimit="3"
                />
            </div>
            <DealsSection title="More deals for you" category="more deals" />

            <div className="flex flex-wrap mt-7">
                <CardSection
                    title="Shop Electronics"
                    category="electronics"
                    cardLimit="3"
                    margins="mr-5"
                />
                <CardSection
                    title="Shop Real Estate"
                    category="real estate"
                    cardLimit="3"
                />
            </div>
            <AppBanner />
        </div>
    );
}
