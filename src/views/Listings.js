import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListings } from "../actions/listings";
import { ListingCard, Sidebar } from "../components";

export default function Listings({ deals }) {
    const [listings, setListings] = useState([]);
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();

    React.useEffect(() => {
        if (searchParams) {
            let params = { city: "", category: "", condition: "" };
            let city = searchParams.get("city");
            let category = searchParams.get("category");
            let condition = searchParams.get("condition");

            if (city) {
                params.city = city;
            }
            if (category) {
                params.category = category;
            }
            if (condition) {
                params.condition = condition;
            }

            // Get filtered listings
            const data = getListings(params);
            setListings(data);
        }
    }, [searchParams]);

    const handleCardClick = (id, category, name) => {
        let city = searchParams.get("city") || "Calgary";
        // Navigate to the specific listing and pass on information about the city and the listing name
        let listingsUrl = `/dashboard/listings/${category}/${id}`;
        let dealsUrl = `/dashboard/deals/${id}`;
        navigate(!deals ? listingsUrl : dealsUrl, {
            state: { name, city },
        });
    };
    return (
        <div>
            <div className="mt-11">
                <div className="flex items-center justify-between mb-15">
                    <h1 className="text-lg text-gray-600 font-bold">
                        Popular
                        <span className="capitalize">
                            {!deals
                                ? ` ${searchParams?.get("category")} `
                                : " Deals "}
                        </span>
                        in {searchParams?.get("city") || "Calgary"}
                    </h1>
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
                    <div>{/* Pagination */}</div>
                </div>
            </div>
        </div>
    );
}
