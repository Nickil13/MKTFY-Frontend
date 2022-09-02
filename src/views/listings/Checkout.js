import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListingContext } from "../../context/ListingContext";
import { formatPrice } from "../../utils/helpers";

export default function Checkout() {
    const { id } = useParams();
    const {
        currentListing: listing,
        getListingById,
        requestPurchase,
    } = useListingContext();
    let navigate = useNavigate();

    React.useEffect(() => {
        if (!listing || listing.id !== id) {
            getListingById(id);
        }
    }, [listing, id]);

    const handleCheckoutClick = () => {
        requestPurchase(listing.id);
        navigate("pickup-information");
    };

    if (!listing) return <p>No listing found</p>;

    return (
        <div className="bg-white border border-beige-200 max-w-[532px] px-7 py-15 mt-[18px]">
            <h1 className="text-purple-100 font-bold mb-7">Checkout</h1>
            {/* Product Info */}
            <div className="flex flex-col shadow-[0px_1px_0px_#00000024] md:flex-row md:h-[125px]">
                <div className="w-full max-w-[226px] flex-shrink-0">
                    <img
                        className="w-full h-full object-cover"
                        src={listing.uploadUrls && listing.uploadUrls[0]}
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
