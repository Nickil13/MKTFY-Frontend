import React, { useState } from "react";
import PurchasesCard from "../../components/cards/PurchasesCard";
import { LISTING_STATUS } from "../../data/variables";
import { useNavigate } from "react-router-dom";
import { getMyPendingListings, getMyActiveListings } from "../../actions/user";

export default function ActiveItems() {
    const [pendingListings, setPendingListings] = useState([]);
    const [availableListings, setAvailableListings] = useState([]);
    let navigate = useNavigate();
    console.log(availableListings);
    React.useEffect(() => {
        getMyPendingListings().then((res) => setPendingListings(res));
        getMyActiveListings().then((res) => setAvailableListings(res));
    }, []);

    const handleListingClick = (status, id, name) => {
        /* Require name for breadcrumbs and status for save permissions */
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
                                tag={LISTING_STATUS.PENDING}
                                onClick={() =>
                                    handleListingClick(
                                        LISTING_STATUS.PENDING,
                                        listing.id,
                                        listing.prodName
                                    )
                                }
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
                                    onClick={() =>
                                        handleListingClick(
                                            LISTING_STATUS.AVAILABLE,
                                            listing.id,
                                            listing.prodName
                                        )
                                    }
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
