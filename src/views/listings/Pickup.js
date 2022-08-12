import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDummyListingById } from "../../actions/listings";
import { getPurchasesById } from "../../actions/purchases";
import { useUserContext } from "../../context/UserContext";
import { formatPhoneNumber, formatPrice } from "../../utils/helpers";

export default function Pickup() {
    const { id } = useParams();
    let location = useLocation();
    // const [listing, setListing] = useState(location.state?.listing || null);
    const [listing, setListing] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const { getUserDetails } = useUserContext();

    React.useEffect(() => {
        if (!listing) {
            // const data = getPurchasesById(id);
            // setListing(data);
            const data = getDummyListingById(id);
            setListing(data);
        }
    }, [listing]);

    React.useEffect(() => {
        // Get the pickup info from the userID on the listing
        // getUserDetails(listing.userId).then((res) => {
        //     if (res) {
        //         setUserDetails({
        //             address: res.address,
        //             name: `${res.firstName} ${res.lastName}`,
        //             phone: res.phone,
        //             city: res.city,
        //         });
        //     }
        // });
    }, []);

    if (!listing) return <p>No listing found</p>;

    return (
        <div className="bg-white border border-beige-200 max-w-[532px] px-7 py-15 mt-[18px]">
            <h1 className="text-purple-100 font-bold mb-7">
                Pickup Information
            </h1>
            {/* Product Info */}
            <div className="flex flex-col shadow-[0px_1px_0px_#00000024] md:flex-row md:h-[125px]">
                <div className="w-full max-w-[226px] flex-shrink-0">
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
            {/* Pickup Information */}
            <div className="mt-9 mb-[46px] pl-5">
                <span className="block text-green text-xs mb-1.5">Pick up</span>
                <div className="flex mb-6">
                    <div className="inline-block circle-letter text-sm-16 py-3.5 px-[18px]">
                        {userDetails?.name[0]}
                    </div>
                    <div>
                        <h2 className="font-bold mb-1">{userDetails?.name}</h2>
                        <span className="text-purple-100 text-xs">
                            {userDetails?.phone &&
                                formatPhoneNumber(userDetails.phone)}
                        </span>
                    </div>
                </div>
                <p className="text-xs text-[#313131]">
                    {`Please pick up your purchase at ${userDetails?.address}, ${userDetails?.city}, Alberta`}
                </p>
            </div>
        </div>
    );
}
