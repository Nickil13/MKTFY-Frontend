import React, { useState } from "react";
import { DealsCard, ScrollBox } from "../components";
import { dummyListings } from "../data/dummyListings";

export default function Home() {
    return (
        <div className="pt-8 pb-32 px-36">
            {/* Deals for you */}
            <div className="px-5 p-7 bg-white rounded h-section">
                <h2 className="text-base font-semibold ">Deals for you</h2>

                <ScrollBox>
                    {dummyListings?.slice(0, 8).map((listing) => {
                        return <DealsCard key={listing.Id} {...listing} />;
                    })}
                </ScrollBox>
            </div>

            <div>{/* Cars  & Vehicles, Furniture*/}</div>
            <div>{/* MORE Deals for you */}</div>
            <div>{/* Electronics, Real Estate*/}</div>
            <div>{/* App Banner*/}</div>
        </div>
    );
}
