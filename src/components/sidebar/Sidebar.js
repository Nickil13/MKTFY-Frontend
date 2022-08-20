import React from "react";
import FilterItem from "./FilterItem";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import CategoryFilterItem from "./CategoryFilterItem";
import PriceFilter from "./PriceFilter";
import { useSearchParams } from "react-router-dom";

export default function Sidebar({ className }) {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <div
            className={`bg-white w-[387px] mr-5 rounded flex-shrink-0 mb-auto divide-y divide-gray-100 text-gray-500 ${className}`}
        >
            {/* Category */}
            {!searchParams?.get("searchValue") && (
                <div className="divide-y divide-gray-100 py-[22px]">
                    <div>
                        <h2 className="text-base font-semibold ml-5 mb-4 ">
                            Category
                        </h2>
                    </div>
                    <div className="py-[22px]">
                        <h3 className="ml-5 mb-2 font-semibold">
                            All Categories:
                        </h3>
                        <ul>
                            {CATEGORY_TYPES?.length > 0 &&
                                CATEGORY_TYPES.map((item, index) => {
                                    return (
                                        <CategoryFilterItem
                                            key={index}
                                            value={item}
                                        >
                                            {item}
                                        </CategoryFilterItem>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            )}
            {/* Location */}
            <div className="py-[31px]">
                <h2 className="text-base font-semibold ml-5 mb-4">
                    Location: Alberta
                </h2>
                <ul>
                    {CITY_OPTIONS?.length > 0 &&
                        CITY_OPTIONS.map((item, index) => {
                            return (
                                <FilterItem
                                    key={index}
                                    value={item}
                                    filterCategory="city"
                                >
                                    {item}
                                </FilterItem>
                            );
                        })}
                </ul>
            </div>
            {/* Condition */}
            <div className=" py-[31px]">
                <h2 className="text-base font-semibold ml-5 mb-4">Condition</h2>
                <ul>
                    {CONDITIONS?.length > 0 &&
                        CONDITIONS.map((item, index) => {
                            return (
                                <FilterItem
                                    value={item}
                                    filterCategory="condition"
                                    key={index}
                                >
                                    {item}
                                </FilterItem>
                            );
                        })}
                </ul>
            </div>

            {/* Price */}
            <PriceFilter />
        </div>
    );
}
