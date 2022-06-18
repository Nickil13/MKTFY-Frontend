import React from "react";

export default function DealsCard({ Images, ProdName, Price }) {
    return (
        <div className="flex flex-col min-w-card h-card mr-6 bg-white rounded-xl overflow-hidden shadow-card">
            <div className="overflow-hidden h-[235px]">
                <img
                    className="object-cover w-full h-full"
                    src={Images[0]}
                    alt={ProdName}
                    draggable="false"
                />
            </div>
            <div className="flex flex-col flex-grow pt-3 pb-5 px-3">
                <h3 className=" flex-grow text-sm-17 capitalize">{ProdName}</h3>
                <span className="text-purple-500 text-base font-bold my-auto">
                    {`$ ${Price}`}
                </span>
            </div>
        </div>
    );
}
