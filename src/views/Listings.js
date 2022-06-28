import React, { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { getDeals, getListings } from "../actions/listings";
import { ListingCard, Sidebar } from "../components";

export default function Listings() {
    const [listings, setListings] = useState([]);
    const { category } = useParams();
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();

    React.useEffect(() => {
        console.log(listings);
        let params = { city: "", category, condition: "" };
        if (searchParams) {
            let city = searchParams.get("city");

            let condition = searchParams.get("condition");

            if (city) {
                params.city = city;
            }
            if (condition) {
                params.condition = condition;
            }
        }
        if (category === "deals") {
            // Specifically get deals w/params.
            const data = getDeals();
            setListings(data);
        } else {
            const data = getListings(params);
            setListings(data);
        }
    }, [searchParams, category]);

    const handleCardClick = (id, category, name) => {
        let city = searchParams.get("city") || "Calgary";
        // Navigate to the specific listing and pass on information about the city and the listing name
        let listingsUrl = `/dashboard/listings/${category}/${id}`;
        navigate(listingsUrl, { state: { name, city } });
    };
    return (
        <div>
            <div className="mt-11">
                <div className="flex items-center justify-between mb-15">
                    {category ? (
                        <h1 className="text-lg text-gray-600 font-bold">
                            Popular
                            <span className="capitalize">
                                {category !== "deals"
                                    ? ` ${category} `
                                    : " Deals "}
                            </span>
                            in {searchParams?.get("city") || "Calgary"}
                        </h1>
                    ) : (
                        <h1 className="text-lg text-gray-600 font-bold">
                            All Listings in{" "}
                            {searchParams?.get("city") || "Calgary"}
                        </h1>
                    )}
                    <div>
                        <span className="text-base">
                            Showing 10 of 100 results
                        </span>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar - Category, Location, Condition, Price */}
                    <Sidebar />
                    {/* Listings */}
                    {listings.length > 0 ? (
                        <div className="bg-white w-full rounded pt-8 pb-12 divide-y divide-gray-100">
                            {listings.length > 0 &&
                                listings.map((listing) => {
                                    return (
                                        <ListingCard
                                            {...listing}
                                            key={listing.Id}
                                            onClick={() =>
                                                handleCardClick(
                                                    listing.Id,
                                                    listing.Category,
                                                    listing.ProdName
                                                )
                                            }
                                        />
                                    );
                                })}
                        </div>
                    ) : (
                        <p>No listings found.</p>
                    )}
                    <div>{/* Pagination */}</div>
                </div>
            </div>
        </div>
    );
}
