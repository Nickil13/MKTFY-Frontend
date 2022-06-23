import React from "react";
import MktfyWordmark from "../../assets/images/MKTFY_wordmark.svg";
import { Link } from "react-router-dom";
import { NAV_CATEGORIES } from "../../data/variables";
import { ReactComponent as DropdownArrow } from "../../assets/images/dropdown.svg";
import AlertBell from "../../assets/images/Group 1553.svg";
import { ReactComponent as AddCircle } from "../../assets/images/add_circle_outline-24px.svg";
import { ReactComponent as SearchIcon } from "../../assets/images/search-24px.svg";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 flex items-center justify-center h-nav bg-purple-500">
            <div className="absolute top-0 right-0 w-full h-[24px] bg-[#000000]/10"></div>
            <div className="flex flex-col  max-w-[1645px] w-full pt-16">
                <div className="flex items-center">
                    {/* logo */}
                    <Link to="/dashboard">
                        <img
                            className="mr-5"
                            src={MktfyWordmark}
                            alt="mktfy wordmark"
                        />
                    </Link>
                    {/* search toolbar: search, categories, city dropdown */}

                    {/* search bar */}
                    <div className="flex items-center w-[1012px] bg-white h-[60px] rounded-lg mr-12 divide-x-2 divide-gray-100">
                        <div className="px-12 text-gray-600 font-semibold">
                            All
                        </div>

                        <form
                            action=""
                            className="flex flex-grow justify-between items-center px-12"
                        >
                            <label
                                className="text-xs font-normal text-[#000000]/50"
                                htmlFor="search"
                            >
                                Search on <strong>MKTFY</strong>
                            </label>
                            <input type="text" id="search" name="search" />
                            <button>
                                <SearchIcon className="fill-gray-500" />
                            </button>
                        </form>

                        <div className="flex items-center px-8 text-gray-600 text-base">
                            <DropdownArrow className="fill-gray-500" />
                            Calgary
                        </div>
                    </div>

                    <div className="flex ">
                        {/* user dropdown */}
                        <button className="mr-9">
                            <p className="text-xs text-gray-100 font-normal">
                                Welcome back,
                                <span className="flex items-center font-semibold text-base text-gold-200">
                                    <DropdownArrow className="fill-gold-200" />
                                    George Calson
                                </span>
                            </p>
                        </button>
                        {/* alert icon */}
                        <img
                            className="w-[24px] mr-[71px]"
                            src={AlertBell}
                            alt="Alert bell icon"
                        />
                        {/* create listing icon*/}
                        <button
                            className="flex items-center justify-center 
                    text-white
                    font-semibold
                    text-xs pl-3 pr-5 w-[153px]
                py-1 rounded-full bg-gold-200 hover:bg-gold-100 shadow-btn"
                        >
                            <AddCircle className="mr-1" />
                            Create Listing
                        </button>
                    </div>
                </div>
                <div className="ml-36">
                    <ul className="flex gap-14 mt-6 mb-5">
                        {NAV_CATEGORIES.map((category, index) => {
                            let path =
                                category === "deals"
                                    ? "deals"
                                    : `listings/?category=${category}`;
                            return (
                                <li
                                    key={index}
                                    className="text-white text-sm-17 font-semibold capitalize"
                                >
                                    <Link to={path}>
                                        {category === "cars"
                                            ? "cars & vehicles"
                                            : category}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
