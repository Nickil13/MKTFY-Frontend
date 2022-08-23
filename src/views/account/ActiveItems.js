import React from "react";
import PurchasesCard from "../../components/cards/PurchasesCard";
import { useNavigate } from "react-router-dom";
import { useListingContext } from "../../context/ListingContext";

export default function ActiveItems() {
    const {
        myPendingListings: pendingListings,
        myActiveListings: availableListings,
        setCurrentListing,
        getMyPendingListings,
        getMyActiveListings,
    } = useListingContext();
    let navigate = useNavigate();

    React.useEffect(() => {
        if (pendingListings.length === 0) {
            getMyPendingListings();
        }
        if (availableListings.length === 0) {
            getMyActiveListings();
        }
    }, []);

    const handleListingClick = (listing) => {
        setCurrentListing(listing);
        navigate(`${listing.id}`);
    };
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
                                onClick={() => handleListingClick(listing)}
                            />
                        );
                    })
                ) : (
                    <p>No pending listings</p>
                )}
            </div>
            <div>
                <h2 className="mb-8 text-[#3C2B4E] uppercase font-semibold text-base">
                    Available Items
                </h2>
                <div className="flex flex-col gap-2">
                    {availableListings.length > 0 ? (
                        availableListings.map((listing, index) => {
                            return (
                                <PurchasesCard
                                    key={index}
                                    {...listing}
                                    onClick={() => handleListingClick(listing)}
                                />
                            );
                        })
                    ) : (
                        <p>No available listings</p>
                    )}
                </div>
            </div>
        </div>
    );
}
