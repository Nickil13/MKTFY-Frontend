import React, { useState } from "react";
import PurchasesCard from "../../components/cards/PurchasesCard";
import { getMySoldListings } from "../../actions/user";
import { LISTING_STATUS } from "../../data/variables";

export default function SoldItems() {
    const [listings, setListings] = useState([]);

    React.useEffect(() => {
        if (listings.length === 0) {
            getMySoldListings().then((res) => {
                setListings(res);
            });
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
                                tag={LISTING_STATUS.SOLD}
                            />
                        );
                    })
                ) : (
                    <p>No sold listings</p>
                )}
            </div>
        </div>
    );
}
