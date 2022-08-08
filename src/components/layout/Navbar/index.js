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
        if (width > MOBILE_WIDTH_BREAKPOINT) {
            setMobileWindowSize(false);
        } else {
            setMobileWindowSize(true);
        }
    };
    return (
        <nav className="fixed top-0 w-full z-50 flex pt-5 lg:pt-0 justify-center lg:items-center h-mobile-nav 2xl:h-nav bg-purple-500 px-2">
            {/* Nav Container */}
            <div className="relative flex flex-col max-w-[1645px] w-full pt-0 xlg:pt-8 2xl:pt-16 px-5 3xl:px-0">
                <div className="flex flex-col items-center 2xl:flex-row justify-center">
                    <div className="grid grid-rows-2 grid-flow-col xlg:flex items-center">
                        {/* logo */}
                        <Link to="/dashboard">
                            <img
                                className="row-start-1 col-start-1 mr-5"
                                src={MktfyWordmark}
                                alt="mktfy wordmark"
                            />
                        </Link>

                        {/* search bar */}
                        <Searchbar className="row-start-2 col-span-2 xlg:w-4/5 flex-shrink" />
                        <MenuIcon className="row-start-1 col-start-2 justify-self-end w-10 h-10 cursor-pointer 2xl:hidden" />
                    </div>
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
                </div>

                {/* Categories Buttons */}
                {!mobileWindowSize && (
                    <ul className="flex flex-wrap gap-14 mt-6 mb-5 mx-auto 2xl:ml-36">
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
            {mobileWindowSize && <MobileCategoriesMenu />}
        </nav>
    );
}
