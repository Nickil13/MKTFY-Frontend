import React, { useState } from "react";
import { DealsCard, ScrollBox } from "../components";
import { getDeals, getMoreDeals } from "../actions/listings";

export default function DealsSection({ title, category }) {
    const [listings, setListings] = useState([]);

    React.useEffect(() => {
        if (category === "deals") {
            let data = getDeals();
            setListings(data);
        } else if (category === "more deals") {
            let data = getMoreDeals();
            setListings(data);
        }
    }, []);

    return (
        <section className="home-section">
            <h2 className="text-base font-semibold">{title}</h2>
            {listings.length > 0 ? (
                <ScrollBox>
                    {listings.map((listing) => {
                        return <DealsCard key={listing.id} {...listing} />;
                    })}
                </ScrollBox>
            ) : (
                <div className="mt-5 text-lg text-gray-200 font-bold">
                    <p>No deals found</p>
                </div>
            )}
        </section>
    );
}
