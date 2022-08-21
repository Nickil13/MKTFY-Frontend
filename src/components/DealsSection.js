import React, { useEffect } from "react";
import { DealsCard, ScrollBox } from "../components";
import { useListingContext } from "../context/ListingContext";
import { useNavigate } from "react-router-dom";

export default function DealsSection({ title, category }) {
    const {
        listings: deals,
        getDeals,
        setCurrentListing,
    } = useListingContext();
    let navigate = useNavigate();
    const currentDeals =
        deals?.length > 0
            ? category === "deals"
                ? deals.slice(0, 8)
                : deals.slice(9, -1)
            : [];

    useEffect(() => {
        if (deals.length === 0) {
            getDeals();
        }
    }, []);

    const handleCardClick = (deal) => {
        setCurrentListing(deal);
        navigate(`/dashboard/listings/deals/${deal.id}`);
    };

    return (
        <section className="relative px-5 p-7 bg-white rounded h-section">
            <h2 className="text-base font-semibold">{title}</h2>
            {currentDeals.length > 0 ? (
                <ScrollBox>
                    {currentDeals.map((deal) => {
                        return (
                            <DealsCard
                                key={deal.id}
                                {...deal}
                                handleCardClick={() => handleCardClick(deal)}
                            />
                        );
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
