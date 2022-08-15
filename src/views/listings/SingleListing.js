import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDummyListingById } from "../../actions/listings";
import { ImageSlider } from "../../components";
import TagIcon from "../../assets/images/local_offer-24px.svg";
import { formatPrice } from "../../utils/helpers";

export default function SingleListing() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    let navigate = useNavigate();

    React.useEffect(() => {
        if (!listing) {
            const data = getDummyListingById(id);
            setListing(data);
        }
    }, [listing, id]);

    return (
        <div>
            {listing ? (
                <div className="flex bg-white pt-7 pb-12 px-8 lg:px-16 mt-5">
                    <div className="flex flex-col 2xl:flex-row w-full mx-auto xlg:max-w-[1000px] 2xl:max-w-none">
                        <ImageSlider
                            images={listing.images}
                            name={listing.prodName}
                            className="flex-grow"
                        />

                        {/* Listing Content */}
                        <div className="w-full max-w-[533px]">
                            <h1 className="text-gray-600 font-semibold mb-3 capitalize mt-10 2xl:mt-0">
                                {listing.prodName}
                            </h1>
                            <span className="block text-purple-500 text-lg-36 font-bold mb-4">
                                {formatPrice(listing.price)}
                            </span>
                            <button
                                className="btn-purple-new mb-3.5 max-w-input"
                                onClick={() =>
                                    navigate("checkout", {
                                        state: { name: listing.prodName },
                                    })
                                }
                            >
                                I want this!
                            </button>

                            <span className="block condition-tag max-w-[48px]">
                                {listing.condition}
                            </span>
                            <div className="mb-6">
                                <h2 className="text-purple-500 font-bold mb-1">
                                    Details
                                </h2>
                                <p>{listing.description}</p>
                            </div>
                            {/* Listing owner information */}
                            <div className="flex">
                                <div className="inline-block circle-letter text-sm-16 py-[13px] px-[18px]">
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
                                        <span className="mr-1 font-bold">
                                            2
                                        </span>
                                        listings
                                    </span>
                                </div>
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
