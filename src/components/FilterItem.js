import React from "react";
import { useSearchParams } from "react-router-dom";

export default function FilterItem({ value, filterCategory, children }) {
    let [searchParams, setSearchParams] = useSearchParams();
    let isActive = searchParams.get(filterCategory) === value;

    const handleFilterClick = () => {
        searchParams.set(filterCategory, value);
        setSearchParams(searchParams);
    };
    return (
        <li
            className={`block px-12 py-2.5 cursor-pointer hover:text-purple-200 capitalize ${
                isActive && "bg-beige-200"
            }`}
            onClick={handleFilterClick}
        >
            {children}
        </li>
    );
}
