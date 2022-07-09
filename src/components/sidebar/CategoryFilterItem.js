import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
export default function CategoryFilterItem({ value }) {
    const { category } = useParams();
    let location = useLocation();

    return (
        <Link
            to={`/dashboard/listings/${value}${location.search}`}
            className={`block px-12 py-2.5 cursor-pointer hover:text-purple-200 capitalize ${
                category === value && "bg-beige-200"
            }`}
        >
            {value}
        </Link>
    );
}
