import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SignoutIcon } from "../../../assets/images/exit_to_app-24px.svg";
import { useUserContext } from "../../../context/UserContext";
import { USER_MENU_LINKS } from "../../../data/variables";
import { ReactComponent as CloseIcon } from "../../../assets/images/icon_close.svg";
import { ReactComponent as AddCircle } from "../../../assets/images/add_circle_outline-24px.svg";

export default function MobileUserMenu({ closeMenu, showing }) {
    const { logout, user } = useUserContext();
    let navigate = useNavigate();

    React.useEffect(() => {
        if (showing) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => (document.body.style.overflow = "unset");
    }, [showing]);

    const handleSignout = () => {
        closeMenu();
        logout();
        console.log("Signing out...");
    };
    return (
        <div
            className={`fixed transition-all duration-500 ease-out flex flex-col items-end z-[9999] inset-0 min-h-screen  ${
                !showing ? "translate-x-full bg-transparent" : "bg-[#00000020]"
            }`}
        >
            <div className="relative p-10 max-w-[350px] w-full min-h-screen overflow-y-auto hide-scrollbar overscroll-y-contain bg-white">
                <CloseIcon
                    className="absolute top-5 right-5 w-[16px] fill-gray-300 cursor-pointer"
                    onClick={closeMenu}
                />
                <div className="flex items-center mt-3 mb-6">
                    <div className="ml-2 circle-letter">
                        {user?.firstName && user.firstName[0]}
                    </div>
                    <h2 className="font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
                </div>

                <div className="mb-16">
                    <h3 className="text-xs font-bold pb-3.5 px-3.5">
                        Settings
                    </h3>
                    <ul>
                        {USER_MENU_LINKS.map(({ name, path }, index) => {
                            return (
                                <li
                                    className="p-3.5 hover:bg-beige-200"
                                    key={index}
                                >
                                    <Link to={path} onClick={closeMenu}>
                                        {name}
                                    </Link>
                                    {name === "My Listings" && (
                                        <span className="bg-purple-500 text-white px-4 py-2.5 rounded-lg ml-4">
                                            2
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mb-12">
                    <h3 className="text-xs font-bold p-3.5">Help</h3>
                    <ul>
                        <li className="p-3.5 hover:bg-beige-200 cursor-pointer">
                            <Link to="FAQ" onClick={closeMenu}>
                                FAQ
                            </Link>
                        </li>
                        <li className="p-3.5 hover:bg-beige-200 cursor-pointer">
                            Contact Us
                        </li>
                    </ul>
                </div>
                <button
                    className="flex items-center justify-center text-white font-semibold text-xs pl-3 pr-5 w-[153px] py-1 rounded-full bg-gold-200 hover:bg-gold-100 shadow-btn h-[50px] mb-8"
                    onClick={() => {
                        navigate("create-listing");
                        closeMenu();
                    }}
                >
                    <AddCircle className="mr-1" />
                    Create Listing
                </button>
                <button
                    className="flex justify-between items-center p-3.5 text-red w-full"
                    onClick={handleSignout}
                >
                    Sign Out <SignoutIcon />
                </button>
            </div>
        </div>
    );
}
