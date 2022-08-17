import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImageSlider } from "../../components";
import TagIcon from "../../assets/images/local_offer-24px.svg";
import { formatPrice } from "../../utils/helpers";
import { useListingContext } from "../../context/ListingContext";

export default function SingleListing() {
    const { id } = useParams();
    const { currentListing: listing, getListingById } = useListingContext();
    let navigate = useNavigate();

    React.useEffect(() => {
        if (!listing || listing.id !== id) {
            getListingById(id);
        }
    }, [listing, id]);

    const handleListingClick = () => {
        navigate("checkout");
    };
    return (
        <div>
            {listing ? (
                <div className="flex bg-white pt-7 pb-12 px-8 lg:px-16 mt-5">
                    <div className="flex flex-col 2xl:flex-row w-full mx-auto xlg:max-w-[1000px] 2xl:max-w-none">
                        <ImageSlider
                            images={listing.uploadUrls}
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
                                onClick={handleListingClick}
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
                                    {listing.userFullName &&
                                        listing.userFullName[0]}
                                </div>
                                <div>
                                    <h2 className="font-bold">
                                        {listing.userFullName}
                                    </h2>
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
