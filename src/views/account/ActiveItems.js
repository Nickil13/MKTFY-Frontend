import React, { useState } from "react";
import PurchasesCard from "../../components/cards/PurchasesCard";
import { getMyActiveListings } from "../../actions/listings";
import { LISTING_STATUS } from "../../data/variables";
import { useNavigate } from "react-router-dom";

export default function ActiveItems() {
    const [listings, setListings] = useState([]);
    let navigate = useNavigate();
    const pendingListings = [
        ...listings?.filter(
            (listing) => listing.Status.toUpperCase() === LISTING_STATUS.PENDING
        ),
    ];
    const availableListings = [
        ...listings?.filter(
            (listing) =>
                listing.Status.toUpperCase() === LISTING_STATUS.AVAILABLE
        ),
    ];

    React.useEffect(() => {
        if (listings.length === 0) {
            const data = getMyActiveListings();
            setListings(data);
        }
    }, []);

    const handleListingClick = (status, id, name) => {
        navigate(`${id}`, { state: { name, status } });
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
                                tag={listing.Status.toUpperCase()}
                                onClick={() =>
                                    handleListingClick(
                                        listing.Status,
                                        listing.Id,
                                        listing.ProdName
                                    )
                                }
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
                            return (
                                <PurchasesCard
                                    key={index}
                                    {...listing}
                                    onClick={() =>
                                        handleListingClick(
                                            listing.Status,
                                            listing.Id,
                                            listing.ProdName
                                        )
                                    }
                                />
                            );
                        })
                    ) : (
                        <div>No available listings</div>
                    )}
                </div>
            </div>
        </div>
    );
}
