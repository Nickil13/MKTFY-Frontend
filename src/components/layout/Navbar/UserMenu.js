import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as DropdownArrow } from "../../../assets/images/dropdown.svg";
import { ReactComponent as SignoutIcon } from "../../../assets/images/exit_to_app-24px.svg";
import { useUserContext } from "../../../context/UserContext";
import { USER_MENU_LINKS } from "../../../data/variables";
import Dropdown from "../../Dropdown";

export default function UserMenu() {
    const [userMenuShowing, setUserMenuShowing] = useState(true);
    const { logout, user } = useUserContext();
    let location = useLocation();

    React.useEffect(() => {
        setUserMenuShowing(false);
    }, [location]);

    const handleSignout = () => {
        setUserMenuShowing(false);
        logout();
        console.log("Signing out...");
    };
    return (
        <div className="relative">
            <Dropdown
                setShowing={setUserMenuShowing}
                showing={userMenuShowing}
                width="w-[315px]"
                pos="top-20 -left-7"
            >
                <div>
                    <div className="flex items-center mt-3 mb-6">
                        <div className="ml-2 circle-letter">
                            {user?.firstName && user.firstName[0]}
                        </div>
                        <h2 className="font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
                    </div>
                    <div className="overflow-y-auto max-h-menu hide-scrollbar overscroll-y-contain">
                        <div className="mb-24">
                            <h3 className="text-xs font-bold pb-3.5 px-3.5">
                                Settings
                            </h3>
                            <ul>
                                {USER_MENU_LINKS.map(
                                    ({ name, path }, index) => {
                                        return (
                                            <li
                                                className="p-3.5 hover:bg-beige-200"
                                                key={index}
                                            >
                                                <Link to={path}>{name}</Link>
                                                {name === "My Listings" && (
                                                    <span className="bg-purple-500 text-white px-4 py-2.5 rounded-lg ml-4">
                                                        2
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                        <div className="mb-12">
                            <h3 className="text-xs font-bold p-3.5">Help</h3>
                            <ul>
                                <li className="p-3.5 hover:bg-beige-200 cursor-pointer">
                                    <Link to="FAQ">FAQ</Link>
                                </li>
                                <li className="p-3.5 hover:bg-beige-200 cursor-pointer">
                                    Contact Us
                                </li>
                            </ul>
                        </div>
                        <button
                            className="flex justify-between items-center p-3.5 text-red w-full"
                            onClick={handleSignout}
                        >
                            Sign Out <SignoutIcon />
                        </button>
                    </div>
                </div>
            </Dropdown>
            <button className="mr-9" onClick={() => setUserMenuShowing(true)}>
                <p className="text-xs text-gray-100 font-normal">
                    Welcome back,
                    <span className="flex items-center font-semibold text-base text-gold-200">
                        <DropdownArrow className="fill-gold-200" />
                        {`${user?.firstName} ${user?.lastName}`}
                    </span>
                </p>
            </button>
        </div>
    );
}
