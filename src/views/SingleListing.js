import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getListingById } from "../actions/listings";
import { Button, ImageSlider } from "../components";
import TagIcon from "../assets/images/local_offer-24px.svg";
import { formatPrice } from "../utils/helpers";

export default function SingleListing() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    React.useEffect(() => {
        if (!listing) {
            const data = getListingById(id);
            setListing(data);
        }
    }, [listing]);

    return (
        <div className="">
            {listing ? (
                <div className="flex bg-white pt-7 pb-12 px-16 mt-5">
                    <ImageSlider
                        images={listing.Images}
                        name={listing.ProdName}
                    />

                    {/* Listing Content */}
                    <div className="flex-grow">
                        <h1 className="text-gray-600 font-semibold mb-3 capitalize">
                            {listing.ProdName}
                        </h1>
                        <span className="block text-purple-500 text-lg-36 font-bold mb-4">
                            {formatPrice(listing.Price)}
                        </span>
                        <Button
                            disabled
                            width="max-w-input w-full"
                            margins="mb-3.5"
                        >
                            Sold out
                        </Button>
                        <span className="block condition-tag max-w-[48px]">
                            {listing.Condition}
                        </span>
                        <div className="mb-6">
                            <h2 className="text-purple-500 font-bold mb-1">
                                Details
                            </h2>
                            <p>{listing.Description}</p>
                        </div>
                        {/* Listing owner information */}
                        <div className="flex">
                            <div className="inline-block text-white rounded-full bg-purple-500 py-[13px] px-[18px] font-bold shadow-btn  mr-2.5">
                                M
                            </div>
                            <div>
                                <h2 className="font-bold">Matt Smith</h2>
                                <span className="flex">
                                    <img
                                        className="mr-1"
                                        src={TagIcon}
                                        alt="listing tag icon"
                                    />
                                    <span className="mr-1 font-bold">2</span>
                                    listings
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No listing found with that ID.</div>
            )}
        </div>
    );
}
