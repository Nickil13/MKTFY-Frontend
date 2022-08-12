import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/images/search-24px.svg";
import { useNavigate } from "react-router-dom";
import { CITY_OPTIONS } from "../../../data/variables";
import CityDropdown from "./CityDropdown";

export default function Searchbar({ className }) {
    const [searchValue, setSearchValue] = useState("");
    const [city, setCity] = useState(CITY_OPTIONS[0]);
    let navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchValue) {
            console.log("Searching: ", searchValue, city);

            // Clear search value
            setSearchValue("");
            navigate(`listings/?search=${searchValue}&city=${city}`);
        }
    };

    return (
        <div
            className={`flex items-center bg-white h-[60px] rounded-lg divide-x-2 divide-gray-100 ${className}`}
        >
            <button
                className="px-12 text-gray-600"
                onClick={() => navigate(`listings/?city=${city}`)}
            >
                All
            </button>

            <form
                onSubmit={handleSearch}
                className="relative flex flex-grow justify-between items-center px-12"
            >
                {!searchValue && (
                    <label
                        className="absolute top-0 text-xs text-[#000000]/50 flex-shrink-0"
                        htmlFor="search"
                    >
                        Search on <strong>MKTFY</strong>
                    </label>
                )}
                <input
                    type="text"
                    id="search"
                    name="search"
                    className="w-full outline-none"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit">
                    <SearchIcon className="fill-gray-500" />
                </button>
            </form>
            <CityDropdown
                className="hidden lg:block relative"
                city={city}
                setCity={setCity}
            />
        </div>
    );
}
