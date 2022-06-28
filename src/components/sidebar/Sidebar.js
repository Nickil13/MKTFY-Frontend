import React from "react";
import FilterItem from "./FilterItem";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import CategoryFilterItem from "./CategoryFilterItem";

export default function Sidebar() {
    return (
        <div className="bg-white w-[387px] mr-5 rounded flex-shrink-0 mb-auto divide-y divide-gray-100 text-gray-500">
            {/* Category */}
            <div className="divide-y divide-gray-100 py-[22px]">
                <div>
                    <h2 className="text-base font-semibold ml-5 mb-4 ">
                        Category
                    </h2>
                </div>
                <div className="py-[22px]">
                    <h3 className="ml-5 mb-2 font-semibold">All Categories:</h3>
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
            {/* Location */}
            <div className=" py-[31px]">
                <div>
                    <h2 className="text-base font-semibold ml-5 mb-4 ">
                        Location: Alberta
                    </h2>
                </div>
                <div>
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
            </div>
            {/* Condition */}
            <div className=" py-[31px]">
                <div>
                    <h2 className="text-base font-semibold ml-5 mb-4 ">
                        Condition
                    </h2>
                </div>
                <div>
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
            </div>

            {/* Price */}
            <div className="py-[22px]">
                <div>
                    <h2 className="text-base font-semibold ml-5 mb-4 ">
                        Price
                    </h2>
                </div>

                <div>
                    <form className="flex flex-col item-center">
                        <div className="flex px-12">
                            <div className="flex flex-col mr-11">
                                <label
                                    htmlFor="fromPrice"
                                    className="text-gray-500"
                                >
                                    From
                                </label>
                                <input
                                    className="p-2 max-w-[123px] border border-footer-border rounded"
                                    type="text"
                                    name="fromPrice"
                                    id="fromPrice"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="toPrice"
                                    className="text-gray-500"
                                >
                                    To
                                </label>
                                <input
                                    className="p-2 max-w-[123px] border border-footer-border rounded"
                                    type="text"
                                    name="toPrice"
                                    id="toPrice"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white text-xs py-3 px-4 bg-gold-200 hover:bg-gold-100 mt-9 mb-3 mx-auto rounded-full shadow-btn"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
