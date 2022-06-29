import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function MyListings() {
    return (
        <div>
            <h1 className="text-gray-500 font-bold mb-3">My Listings</h1>
            <ul className="flex mb-8">
                <li className="font-semibold text-base mr-14">
                    <NavLink
                        to=""
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-[5px] border-b-purple-100 text-purple-400"
                                : "border-b-[5px] border-b-transparent text-gray-footer"
                        }
                    >
                        Active Items
                    </NavLink>
                </li>
                <li className="flex items-center font-semibold text-base">
                    {/* New Sold Dot Icon */}
                    <div className="w-[8px] h-[8px] bg-gold-200 rounded-full mb-[5px]"></div>
                    <NavLink
                        to="sold"
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-[5px] border-b-purple-100 text-purple-400 px-2"
                                : "border-b-[5px] border-b-transparent text-gray-footer px-2"
                        }
                    >
                        Sold Items
                    </NavLink>
                </li>
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
