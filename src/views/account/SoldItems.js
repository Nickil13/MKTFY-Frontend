import React, { useState } from "react";
import { getMySoldListings } from "../../actions/listings";
import PurchasesCard from "../../components/cards/PurchasesCard";

export default function SoldItems() {
    const [listings, setListings] = useState([]);

    React.useEffect(() => {
        if (listings.length === 0) {
            const data = getMySoldListings();
            setListings(data);
        }
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-2 mb-8">
                {listings.length > 0 ? (
                    listings.map((listing, index) => {
                        return (
                            <PurchasesCard
                                key={index}
                                {...listing}
                                tag={listing.Status.toUpperCase()}
                            />
                        );
                    })
                ) : (
                    <div>No pending listings</div>
                )}
            </div>
        </div>
    );
}
