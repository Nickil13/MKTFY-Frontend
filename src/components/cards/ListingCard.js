import React from "react";
import { formatPrice } from "../../utils/helpers";

export default function ListingCard({
    prodName,
    category,
    uploadUrls,
    price,
    condition,
    description,
    onClick,
}) {
    return (
        <div
            className="flex flex-col lg:flex-row py-6 px-8 lg:px-14 min-h-listing-card cursor-pointer"
            onClick={onClick}
        >
            <div className="w-full flex-shrink-0 h-card-img shadow-card rounded-lg overflow-hidden lg:max-w-card">
                <img
                    className="object-cover w-full h-full"
                    src={uploadUrls.length > 0 ? uploadUrls[0] : []}
                    alt={prodName}
                />
            </div>
            <div className="mt-12 lg:mt-0 lg:ml-12">
                <div className="text-base mb-5">
                    <h2>{prodName}</h2>
                    <p className="capitalize">{category}</p>
                </div>

                <p className="text-purple-500 text-base font-bold">
                    {formatPrice(price)}
                </p>
                <span className="inline-block condition-tag">{condition}</span>
                <p className="text-[18px]">{description}</p>
            </div>
        </div>
    );
}
