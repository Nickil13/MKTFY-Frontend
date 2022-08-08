import React, { useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { getDeals, getListings } from "../../actions/listings";
import { ListingCard, Pagination, Sidebar } from "../../components";

export default function Listings() {
    const [listings, setListings] = useState([]);
    const { category } = useParams();
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();
    let page = searchParams.get("page") || 1;
    // let pageParam = searchParams.get("page") || 1;
    // let page = 1;

    React.useEffect(() => {
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
                        <div className="flex-grow">
                            <div className="bg-white w-full rounded pt-8 pb-12 divide-y divide-gray-100 mb-12">
                                {listings.length > 0 &&
                                    listings.map((listing) => {
                                        return (
                                            <ListingCard
                                                {...listing}
                                                key={listing.id}
                                                onClick={() =>
                                                    handleCardClick(
                                                        listing.id,
                                                        listing.category,
                                                        listing.prodName
                                                    )
                                                }
                                            />
                                        );
                                    })}
                            </div>
                            <Pagination page={page} pages={6} />
                        </div>
                    ) : (
                        <p>No listings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
