import React from "react";
import { formatPrice } from "../../utils/helpers";

export default function DealsCard({
    prodName,
    uploadUrls,
    price,
    handleCardClick,
}) {
    return (
        <div className="flex flex-col min-w-card max-w-card h-card mr-[20px] bg-white rounded-xl overflow-hidden shadow-card">
            <div className="overflow-hidden h-card-img-sm">
                <img
                    className="object-cover w-full h-full"
                    src={uploadUrls.length > 0 ? uploadUrls[0] : ""}
                    alt={prodName}
                    draggable="false"
                />
            </div>
            <div className="flex flex-col flex-grow pt-3 pb-5 px-3">
                <h3
                    className=" flex-grow text-sm-17 capitalize hover:underline"
                    onClick={handleCardClick}
                >
                    {prodName}
                </h3>
                <span className="text-purple-500 text-base font-bold my-auto">
                    {formatPrice(price)}
                </span>
            </div>
        </div>
    );
}
