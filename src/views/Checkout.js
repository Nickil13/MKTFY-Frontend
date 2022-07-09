import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById } from "../actions/listings";
import { Button } from "../components";
import { formatPrice } from "../utils/helpers";

export default function Checkout() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    let navigate = useNavigate();

    React.useEffect(() => {
        if (!listing) {
            const data = getListingById(id);
            setListing(data);
        }
    }, [listing]);

    if (!listing) return <p>No listing found</p>;

    return (
        <div className="bg-white border border-beige-200 max-w-[532px] px-7 py-15 mt-[18px]">
            <h1 className="text-purple-100 font-bold mb-7">Checkout</h1>
            {/* Product Info */}
            <div className="flex shadow-[0px_1px_0px_#00000024] h-[125px]">
                <div className="min-w-[226px]">
                    <img
                        className="w-full h-full object-cover"
                        src={listing.Images[0]}
                        alt={listing.ProdName}
                    />
                </div>
                <div className="px-4 pt-3 pb-5">
                    <h2 className="text-xs mb-1">{listing.ProdName}</h2>
                    <span className="block text-purple-500 text-sm-16 font-bold">
                        {formatPrice(listing.Price)}
                    </span>
                    <span className="inline-block condition-tag my-2">
                        {listing.Condition}
                    </span>
                </div>
            </div>
            <Button
                width="w-full"
                margins="mt-[138px] mb-[26px]"
                onClick={() =>
                    navigate("pickup-information", {
                        state: { listing, name: listing.ProdName },
                    })
                }
            >
                Confirm
            </Button>
        </div>
    );
}
