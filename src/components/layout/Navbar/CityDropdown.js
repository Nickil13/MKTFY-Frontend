import React, { useState } from "react";
import Dropdown from "../../Dropdown";
import { ReactComponent as DropdownArrow } from "../../../assets/images/dropdown.svg";
import { ReactComponent as SearchIcon } from "../../../assets/images/search-24px.svg";
import { CITY_OPTIONS } from "../../../data/variables";

export default function CityDropdown({ className, city, setCity, textColor }) {
    const [showing, setShowing] = useState(false);

    const handleDropdownClick = (cityName) => {
        setCity(cityName);
        setShowing(false);
    };

    return (
        <div className={className}>
            <Dropdown
                width="w-[315px]"
                showing={showing}
                setShowing={setShowing}
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
                                    onClick={() => handleDropdownClick(name)}
                                >
                                    {name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Dropdown>
            <button
                className={`flex items-center px-8 ${
                    textColor ? textColor : "text-gray-600"
                }  text-base w-[172px]`}
                onClick={() => setShowing(true)}
            >
                <DropdownArrow className="fill-gray-500" />
                {city}
            </button>
        </div>
    );
}
