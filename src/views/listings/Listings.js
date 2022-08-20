import React from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { ListingCard, Pagination, Sidebar } from "../../components";
import { useListingContext } from "../../context/ListingContext";
import { NAV_CATEGORIES } from "../../data/variables";

export default function Listings() {
    const { category } = useParams();
    const { listings, getFilteredListings, setCurrentListing, getDeals } =
        useListingContext();
    const checkedCategory = !NAV_CATEGORIES.includes(category) ? "" : category;
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();
    let page = searchParams.get("page") || 1;
    let city = searchParams.get("city") || "Calgary";
    // let pageParam = searchParams.get("page") || 1;
    // let page = 1;

    React.useEffect(() => {
        if (category === "deals") {
            getDeals();
        } else if (searchParams) {
            const filter = {
                city,
                category: checkedCategory,
                condition: searchParams.get("condition") || "",
            };
            getFilteredListings(filter);
        }
    }, [checkedCategory, searchParams]);

    const handleCardClick = (listing) => {
        setCurrentListing(listing);
        // Navigate to the specific listing and pass on information about the city and the listing name
        navigate(`/dashboard/listings/${listing.category}/${listing.id}`, {
            state: { city },
        });
    };
    return (
        <div>
            <div className="mt-11">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-15">
                    {checkedCategory ? (
                        <h1 className="text-lg text-gray-600 font-bold">
                            Popular
                            <span className="capitalize">
                                {checkedCategory !== "deals"
                                    ? ` ${checkedCategory} `
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
                    <div className="mt-2 lg:mt-0">
                        <span className="text-base">
                            Showing 10 of 100 results
                        </span>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar - Category, Location, Condition, Price */}
                    <Sidebar className="hidden xlg:block" />
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
                                                    handleCardClick(listing)
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
