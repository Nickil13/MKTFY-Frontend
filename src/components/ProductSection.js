import React, { useState } from "react";
import { ProductCard } from ".";
import { Link } from "react-router-dom";
import { getListings } from "../actions/listings";

export default function ProductSection({
    title,
    category,
    cardLimit,
    margins,
}) {
    const [listings, setListings] = useState([]);

    React.useEffect(() => {
        let params = { category };
        let data = getListings(params, cardLimit);
        setListings(data);
    }, [category, cardLimit]);

    return (
        <section className={`home-section ${margins}`}>
            <h2 className="text-base font-semibold">{title}</h2>
            <div className="flex flex-wrap bg-white pb-5 pt-12 px-[10px]">
                {listings?.map((listing, index) => {
                    return (
                        <ProductCard
                            key={listing.Id}
                            {...listing}
                            lastchild={index === 2}
                        />
                    );
                })}
            </div>
            <Link
                to={`listings/?category=${category}`}
                className="absolute right-7 bottom-7 text-purple-100 text-xs"
            >
                Explore Now
            </Link>
        </section>
    );
}
