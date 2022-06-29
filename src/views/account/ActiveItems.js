import React, { useState } from "react";
import PurchasesCard from "../../components/cards/PurchasesCard";
import { getMyActiveListings } from "../../actions/listings";
export default function ActiveItems() {
    const [listings, setListings] = useState([]);
    const pendingListings = [
        ...listings?.filter(
            (listing) => listing.Status.toUpperCase() === "PENDING"
        ),
    ];
    const availableListings = [
        ...listings?.filter(
            (listing) => listing.Status.toUpperCase() === "AVAILABLE"
        ),
    ];

    React.useEffect(() => {
        if (listings.length === 0) {
            const data = getMyActiveListings();
            console.log(data);

            setListings(data);
        }
    }, []);

    return (
        <div>
            {/* Pending States */}
            <div className="flex flex-col gap-2 mb-8">
                {pendingListings.length > 0 ? (
                    pendingListings.map((listing, index) => {
                        return (
                            <PurchasesCard
                                key={index}
                                {...listing}
                                tag="pending"
                            />
                        );
                    })
                ) : (
                    <div>No pending listings</div>
                )}
            </div>
            <div>
                <h2 className="mb-8 text-[#3C2B4E] uppercase font-semibold text-base">
                    Available Items
                </h2>
                <div className="flex flex-col gap-2">
                    {availableListings.length > 0 ? (
                        availableListings.map((listing, index) => {
                            return <PurchasesCard key={index} {...listing} />;
                        })
                    ) : (
                        <div>No available listings</div>
                    )}
                </div>
            </div>
        </div>
    );
}
