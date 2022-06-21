import React from "react";

export default function SidebarSection({ title, items, value, setValue }) {
    return (
        <div className="divide-y divide-gray-100 py-[22px]">
            <div>
                <h2 className="text-base font-semibold ml-5 mb-4 ">{title}</h2>
            </div>
            <div className="py-[22px]">
                <h3 className="ml-5 mb-2 font-semibold">All Categories:</h3>
                <ul>
                    {items?.length > 0 &&
                        items.map((item, index) => {
                            return (
                                <li
                                    className={`px-12 py-[10px] cursor-pointer hover:text-purple-200 capitalize ${
                                        value === item && "bg-beige-200"
                                    }`}
                                    key={index}
                                    onClick={() => {
                                        console.log("clicked");
                                        setValue(item);
                                    }}
                                >
                                    {item}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}
