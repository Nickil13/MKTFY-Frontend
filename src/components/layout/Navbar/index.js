import React, { useState, useEffect } from "react";
import MktfyWordmark from "../../../assets/images/MKTFY_wordmark.svg";
import { Link, useNavigate } from "react-router-dom";
import { NAV_CATEGORIES } from "../../../data/variables";
import { ReactComponent as AddCircle } from "../../../assets/images/add_circle_outline-24px.svg";
import { ReactComponent as MenuIcon } from "../../../assets/images/menu-24px (1).svg";
import Searchbar from "./Searchbar";
import Notifications from "../../Notifications";
import UserMenu from "./UserMenu";
import MobileCategoriesMenu from "./MobileCategoriesMenu";

const MOBILE_WIDTH_BREAKPOINT = "800";

export default function Navbar() {
    const [mobileWindowSize, setMobileWindowSize] = useState(
        window.innerWidth < MOBILE_WIDTH_BREAKPOINT
    );
    let navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("resize", checkSize);
        return () => {
            window.removeEventListener("resize", checkSize);
        };
    }, []);

    const checkSize = () => {
        const width = window.innerWidth;
        if (width >= MOBILE_WIDTH_BREAKPOINT) {
            setMobileWindowSize(false);
        } else {
            setMobileWindowSize(true);
        }
    };
    return (
        <nav className="fixed top-0 w-full z-50 flex justify-center lg:items-center h-nav bg-purple-500 px-2">
            {/* Nav Container */}
            <div className="relative flex flex-col max-w-desktop w-full pt-5 lg:pt-16 pb-5 px-5 3xl:px-0">
                {/* Navbar top row */}
                <div className="grid grid-flow-cols grid-rows-2 items-center lg:justify-center w-full xlg:w-[90%] mx-auto 2xl:w-full">
                    {/* Logo, Searchbar, Mobile Menu Icon */}
                    <Link
                        to="/dashboard"
                        className="row-start-1 col-start-1 mr-5"
                    >
                        <img src={MktfyWordmark} alt="mktfy wordmark" />
                    </Link>
                    <Searchbar className="flex-1 row-start-2 lg:row-start-1 col-span-3 lg:col-start-2 lg:col-end-2 max-w-[800px] 2xl:mr-14 3xl:w-[1012px] 3xl:max-w-[1012px]" />
                    <MenuIcon className="ml-5 row-start-1 col-start-3 justify-self-end w-10 h-10 cursor-pointer 2xl:hidden" />

                    {/* User Menu, Notifications, Create Listing Button */}
                    <div className="hidden 2xl:flex">
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
                    {/* Categories Buttons */}
                    {!mobileWindowSize && (
                        <ul className="flex justify-center 2xl:justify-start gap-14 mt-5 row-start-2 mx-auto xlg:mx-0 2xl:col-start-2 col-span-3 2xl:col-span-2">
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
                    )}
                </div>
            </div>
            {mobileWindowSize && <MobileCategoriesMenu />}
        </nav>
    );
}
