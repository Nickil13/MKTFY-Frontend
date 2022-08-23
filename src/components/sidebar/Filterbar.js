import React from "react";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import Select from "../Select";
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";

export default function Filterbar({ className }) {
    const { category } = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();
    let location = useLocation();

    const setCategoryFilter = (value) => {
        navigate(`/dashboard/listings/${value}${location.search}`);
    };

    const handleFilterClick = (value, filterCategory) => {
        searchParams.set(filterCategory, value);
        setSearchParams(searchParams);
    };

    return (
        <div
            className={`bg-white rounded text-gray-500 ${className} p-10 divide-y divide-gray-100`}
        >
            <div className="grid lg:grid-cols-3 gap-5 pb-6">
                {/* Category */}
                <Select
                    name="category"
                    options={CATEGORY_TYPES}
                    value={category}
                    setValue={setCategoryFilter}
                />

                {/* Location */}
                <Select
                    name="city"
                    options={CITY_OPTIONS}
                    value={searchParams?.get("city")}
                    setValue={handleFilterClick}
                    filterCategory="city"
                />

                {/* Condition */}
                <Select
                    name="condition"
                    options={CONDITIONS}
                    value={searchParams?.get("condition")}
                    setValue={handleFilterClick}
                    filterCategory="condition"
                />
            </div>
            {/* Price */}
            <div className="py-6">
                <h2 className="text-base font-semibold mb-4 ">Price</h2>

                <form className="flex flex-col md:flex-row items-center">
                    <div className="flex ">
                        <div className="flex flex-col mr-11">
                            <label
                                htmlFor="fromPrice"
                                className="text-gray-500"
                            >
                                From
                            </label>
                            <input
                                className="p-2 w-full max-w-[123px] border border-footer-border rounded"
                                type="text"
                                name="fromPrice"
                                id="fromPrice"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="toPrice" className="text-gray-500">
                                To
                            </label>
                            <input
                                className="p-2 w-full max-w-[123px] border border-footer-border rounded"
                                type="text"
                                name="toPrice"
                                id="toPrice"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white text-xs py-3 px-4 bg-gold-200 hover:bg-gold-100 h-[50px] mt-6 lg:mt-auto ml-5 rounded-full shadow-btn"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
