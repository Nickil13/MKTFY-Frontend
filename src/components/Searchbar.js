import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/images/search-24px.svg";
import { ReactComponent as DropdownArrow } from "../assets/images/dropdown.svg";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { CITY_OPTIONS } from "../data/variables";

export default function Searchbar() {
    const [searchValue, setSearchValue] = useState("");
    const [cityDropdownShowing, setCityDropdownShowing] = useState(false);
    const [city, setCity] = useState(CITY_OPTIONS[0]);
    let navigate = useNavigate();

    const showCityDropdown = () => {
        setCityDropdownShowing(true);
    };

    const handleDropdownClick = (cityName) => {
        setCity(cityName);
        setCityDropdownShowing(false);
    };
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
        <div className="flex items-center w-[1012px] bg-white h-[60px] rounded-lg mr-12 divide-x-2 divide-gray-100">
            <button
                className="px-12 text-gray-600"
                onClick={() => navigate(`listings/?city=${city}`)}
            >
                All
            </button>

            <form
                onSubmit={handleSearch}
                className="flex flex-grow justify-between items-center px-12"
            >
                <label
                    className="text-xs font-normal text-[#000000]/50 flex-shrink-0"
                    htmlFor="search"
                >
                    Search on <strong>MKTFY</strong>
                </label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    className="ml-5 w-full outline-none"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit">
                    <SearchIcon className="fill-gray-500" />
                </button>
            </form>
            <div className="relative">
                <Dropdown
                    width="w-[315px]"
                    showing={cityDropdownShowing}
                    setShowing={setCityDropdownShowing}
                    arrowRight
                    pos="top-16 right-[70px]"
                >
                    <div className="my-3.5">
                        <div className="flex border border-[#D1D1D1] px-5 py-3.5 rounded mx-3.5 mb-2">
                            <SearchIcon className="mr-1" />
                            <input
                                type="text"
                                id="city-search"
                                name="city-search"
                                placeholder="Search City"
                                className="outline-none"
                            />
                        </div>
                        <ul>
                            {CITY_OPTIONS.map((name, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`p-3.5 hover:bg-beige-200 cursor-pointer text-xs ${
                                            name === city &&
                                            "bg-beige-200 text-purple-100"
                                        }`}
                                        onClick={() =>
                                            handleDropdownClick(name)
                                        }
                                    >
                                        {name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Dropdown>
                <button
                    className="flex items-center px-8 text-gray-600 text-base w-[172px]"
                    onClick={showCityDropdown}
                >
                    <DropdownArrow className="fill-gray-500" />
                    {city}
                </button>
            </div>
        </div>
    );
}
