import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { ReactComponent as DropdownArrow } from "../../assets/images/dropdown.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/search-24px.svg";
import { CITY_OPTIONS } from "../../data/variables";

export default function CityDropdown({
    className,
    city,
    setCity,
    buttonClassName,
    pos,
}) {
    const [showing, setShowing] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [cityList, setCityList] = useState([...CITY_OPTIONS]);

    const handleDropdownClick = (cityName) => {
        setCity(cityName);
        setShowing(false);
        setSearchValue("");
    };

    React.useEffect(() => {
        const filteredList = CITY_OPTIONS.filter((city) =>
            city.toLowerCase().includes(searchValue.toLowerCase())
        );
        setCityList([...filteredList]);
    }, [searchValue]);

    return (
        <div className={className}>
            <Dropdown
                width="w-[315px] max-w-[60vw]"
                showing={showing}
                setShowing={setShowing}
                arrowRight
                pos={pos}
            >
                <div className="my-3.5 overflow-y-auto max-h-city-search hide-scrollbar overscroll-y-contain">
                    <div className="flex border border-[#D1D1D1] px-5 py-3.5 rounded mx-3.5 mb-2">
                        <SearchIcon className="mr-1" />
                        <input
                            type="text"
                            id="city-search"
                            name="city-search"
                            placeholder="Search City"
                            className="outline-none  w-full"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <ul>
                        {cityList.map((name, index) => {
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
                className={`flex items-center px-8 text-gray-600 text-base w-[172px] ${buttonClassName}`}
                onClick={() => setShowing(true)}
            >
                <DropdownArrow className="fill-gray-500" />
                {city}
            </button>
        </div>
    );
}
