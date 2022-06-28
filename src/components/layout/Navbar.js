import React from "react";
import MktfyWordmark from "../../assets/images/MKTFY_wordmark.svg";
import { Link, useNavigate } from "react-router-dom";
import { NAV_CATEGORIES } from "../../data/variables";
import { ReactComponent as AddCircle } from "../../assets/images/add_circle_outline-24px.svg";
import Searchbar from "../Searchbar";
import Notifications from "../Notifications";
import UserMenu from "../UserMenu";

export default function Navbar() {
    let navigate = useNavigate();
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

                    {/* search bar */}
                    <Searchbar />

                    <div className="flex">
                        <UserMenu />
                        <Notifications />

                        {/* Create listing button*/}
                        <button
                            className="flex items-center justify-center text-white font-semibold text-xs pl-3 pr-5 w-[153px] py-1 rounded-full bg-gold-200 hover:bg-gold-100 shadow-btn"
                            onClick={() => navigate("create-listing")}
                        >
                            <AddCircle className="mr-1" />
                            Create Listing
                        </button>
                    </div>
                </div>
                <div className="ml-36">
                    <ul className="flex gap-14 mt-6 mb-5">
                        {NAV_CATEGORIES.map((category, index) => {
                            return (
                                <li
                                    key={index}
                                    className="text-white text-sm-17 font-semibold capitalize"
                                >
                                    <Link to={`listings/${category}`}>
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
