import React, { useState } from "react";
import CityDropdown from "./CityDropdown";
import { NAV_CATEGORIES } from "../../../data/variables";
import { Link } from "react-router-dom";
import CategoryIconButton from "./CategoryIconButton";
import ScrollBox from "../../ScrollBox";

export default function MobileCategoriesMenu() {
    const [city, setCity] = useState("Calgary");
    return (
        <div className="absolute -bottom-28 left-0 right-0 flex flex-col bg-white shadow-modal">
            <div className="flex flex-col container py-4">
                <div className="flex justify-between mb-4">
                    <h3>Browse Categories</h3>
                    <CityDropdown
                        city={city}
                        setCity={setCity}
                        buttonClassName="text-purple-600 text-sm-16 px-0 justify-end"
                    />
                </div>
                <ScrollBox className="gap-14 list-none py-0">
                    {NAV_CATEGORIES.map((category, index) => {
                        return (
                            <li
                                key={index}
                                className="text-sm-17 font-semibold capitalize flex-shrink-0"
                            >
                                <Link
                                    to={`listings/${category}`}
                                    draggable="false"
                                >
                                    <CategoryIconButton category={category} />
                                </Link>
                            </li>
                        );
                    })}
                </ScrollBox>
            </div>
        </div>
    );
}
