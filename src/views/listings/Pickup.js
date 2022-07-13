import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getListingById } from "../../actions/listings";
import { getPurchasesById } from "../../actions/purchases";
import { formatPrice } from "../../utils/helpers";

export default function Pickup() {
    const { id } = useParams();
    let location = useLocation();
    const [listing, setListing] = useState(location.state?.listing || null);

    React.useEffect(() => {
        if (!listing) {
            // const data = getListingById(id);
            // setListing(data);
            const data = getPurchasesById(id);
            setListing(data);
        }
    }, [listing]);

    if (!listing) return <p>No listing found</p>;

    return (
        <div className="bg-white border border-beige-200 max-w-[532px] px-7 py-15 mt-[18px]">
            <h1 className="text-purple-100 font-bold mb-7">
                Pickup Information
            </h1>
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
            {/* Pickup Information */}
            <div className="mt-9 mb-[46px] pl-5">
                <span className="block text-green text-xs mb-1.5">Pick up</span>
                <div className="flex mb-6">
                    <div className="inline-block circle-letter text-sm-16 py-3.5 px-[18px]">
                        M
                    </div>
                    <div>
                        <h2 className="font-bold mb-1">Matt Smith</h2>
                        <span className="text-purple-100 text-xs">
                            403-123-4567
                        </span>
                    </div>
                </div>
                <p className="text-xs text-[#313131]">
                    Please pick up your purchase at 12 12ave SW, Calgary,
                    Alberta
                </p>
            </div>
        </div>
    );
}
