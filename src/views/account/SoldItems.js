import React from "react";
import PurchasesCard from "../../components/cards/PurchasesCard";
import { useListingContext } from "../../context/ListingContext";

export default function SoldItems() {
    const { mySoldListings: listings, getMySoldListings } = useListingContext();

    React.useEffect(() => {
        if (listings.length === 0) {
            getMySoldListings();
        }
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-2 mb-8">
                {listings.length > 0 ? (
                    listings.map((listing, index) => {
                        return <PurchasesCard key={index} {...listing} />;
                    })
                ) : (
                    <p>No sold listings</p>
                )}
            </div>
        </div>
    );
}
