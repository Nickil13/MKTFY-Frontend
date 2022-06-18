import React from "react";
import dummyListings from "../data/dummyListings";
export default function Home() {
    return (
        <div className="pt-8 pb-32 px-36">
            {/* Deals for you */}
            <div className="px-5 py-7 bg-white rounded h-[480px]">
                <h2 className="text-base font-semibold mb-6">Deals for you</h2>
                <div className="flex">
                    <div className="flex flex-col w-[236px] h-[351px]  bg-white rounded-xl overflow-hidden shadow-card">
                        <div className="overflow-hidden h-[235px]">
                            <img
                                className=" object-cover w-full"
                                src="https://images.unsplash.com/photo-1589217157232-464b505b197f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                alt="apples"
                            />
                        </div>
                        <div className="flex flex-col flex-grow pt-3 pb-5 px-3">
                            <h3 className=" flex-grow text-sm-17">Apples</h3>
                            <span className="text-purple-500 text-base font-bold my-auto">
                                $ 169.98
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div>{/* Cars  & Vehicles, Furniture*/}</div>
            <div>{/* MORE Deals for you */}</div>
            <div>{/* Electronics, Real Estate*/}</div>
            <div>{/* App Banner*/}</div>
        </div>
    );
}
