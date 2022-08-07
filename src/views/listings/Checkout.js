import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getDummyListingById,
    getListingById,
    requestPurchase,
} from "../../actions/listings";
import { formatPrice } from "../../utils/helpers";

export default function Checkout() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    let navigate = useNavigate();

    React.useEffect(() => {
        if (!listing) {
            // getListingById(id).then((res) => {
            //     if (res) {
            //         setListing(res);
            //     }
            // });
            const data = getDummyListingById(id);
            setListing(data);
        }
    }, [listing]);

    const handleCheckoutClick = () => {
        requestPurchase(id).then((res) => {
            if (res) {
                navigate("pickup-information", {
                    state: { listing: res, name: listing.prodName },
                });
            }
        });
    };

    if (!listing) return <p>No listing found</p>;

    return (
        <div className="bg-white border border-beige-200 max-w-[532px] px-7 py-15 mt-[18px]">
            <h1 className="text-purple-100 font-bold mb-7">Checkout</h1>
            {/* Product Info */}
            <div className="flex shadow-[0px_1px_0px_#00000024] h-[125px]">
                <div className="min-w-[226px]">
                    <img
                        className="w-full h-full object-cover"
                        src={listing.images && listing.images[0]}
                        alt={listing.prodName}
                    />
                </div>
                <div className="px-4 pt-3 pb-5">
                    <h2 className="text-xs mb-1">{listing.prodName}</h2>
                    <span className="block text-purple-500 text-sm-16 font-bold">
                        {formatPrice(listing.price)}
                    </span>
                    <span className="inline-block condition-tag my-2">
                        {listing.condition}
                    </span>
                </div>
            </div>
            <button
                className="btn-purple-new mt-[138px] mb-[26px]"
                onClick={handleCheckoutClick}
            >
                Confirm
            </button>
        </div>
    );
}
