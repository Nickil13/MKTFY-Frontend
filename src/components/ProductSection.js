import React, { useState } from "react";
import { ProductCard } from ".";
import { Link } from "react-router-dom";
import { getListings } from "../actions/listings";

export default function ProductSection({ title, category, cardLimit }) {
    const [listings, setListings] = useState([]);

    React.useEffect(() => {
        let params = { category };
        let data = getListings(params, cardLimit);
        setListings(data);
    }, [category, cardLimit]);

    return (
        <section className="relative px-5 py-10 bg-white rounded xlg:h-section 2xl:h-auto 2xl:first:mb-0 w-full first:mb-5 2xl:first:mr-5">
            <h2 className="text-base font-semibold">{title}</h2>
            <div className="flex flex-wrap gap-5 bg-white pb-16 pt-12 px-[10px]">
                {listings?.map((listing) => {
                    return <ProductCard key={listing.id} {...listing} />;
                })}
            </div>
            <Link
                to={`listings/${category}`}
                className="absolute right-7 bottom-7 text-purple-100 text-xs"
            >
                Explore Now
            </Link>
        </section>
    );
}
