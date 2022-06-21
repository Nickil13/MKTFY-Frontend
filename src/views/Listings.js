import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getListings } from "../actions/listings";
import { ListingCard, Sidebar } from "../components";

export default function Listings() {
    const [listings, setListings] = useState([]);
    let location = useLocation();
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
            console.log(params);
            const data = getListings(params);
            setListings(data);
        }
    }, [searchParams]);

    return (
        <div>
            {/* Breadcrumbs */}
            <div className="mb-11">
                <ul className="flex">
                    {location?.pathname
                        ?.split("/")
                        .slice(1)
                        .map((crumb, index) => {
                            const lastCrumbIndex =
                                location.pathname.split("/").slice(1) - 1;
                            return (
                                <li
                                    key={index}
                                    className={`capitalize ${
                                        index !== lastCrumbIndex && "mr-1"
                                    }`}
                                >
                                    {crumb}
                                    {index !== lastCrumbIndex && ">"}
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div>
                <div className="flex items-center justify-between mb-15">
                    <h1 className="text-lg text-gray-600 font-bold">
                        Popular
                        <span className="capitalize">
                            {` ${searchParams?.get("category")} `}
                        </span>
                        in {searchParams?.get("city")}
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
                                        key={listing.Id}
                                        {...listing}
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
