import React from "react";
const CHAM_IMG =
    "https://images.unsplash.com/photo-1656428379377-98039ab9695a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

const FLOWER_IMG =
    "https://images.unsplash.com/photo-1656380605767-28a92b240053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1372&q=80";
export default function MyPurchases() {
    return (
        <div>
            <h1 className="text-gray-500 font-bold mb-4">My Purchases</h1>
            <span className="text-gray-500 text-sm-16 mb-7">2 items</span>
            <div>
                {/* Purchases Card */}
                <div className="flex max-w-[808px] h-[214px] shadow-[0px_1px_0px_#00000024] rounded-[10px] overflow-hidden">
                    <div className="w-[350px] flex-shrink-0">
                        <img
                            className="w-full h-full object-cover"
                            src={CHAM_IMG}
                            alt="chameleon"
                        />
                    </div>
                    <div className="bg-white w-full">
                        <span>September 07 2020</span>
                        <h2>A Chameleon</h2>
                        <span>$340.00</span>
                        <div>
                            &bull; <span>Condition - New</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
