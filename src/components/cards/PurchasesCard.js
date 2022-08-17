import React from "react";
import { LISTING_STATUS } from "../../data/variables";
import { formatPrice, formatDate } from "../../utils/helpers";

const dummyImage =
    "https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80";

export default function PurchasesCard({
    uploadUrls,
    created,
    prodName,
    price,
    condition,
    onClick,
    status,
}) {
    return (
        <div
            className={`flex flex-col lg:flex-row max-w-[808px] lg:h-[214px] shadow-card-faint rounded-10 overflow-hidden ${
                onClick && "cursor-pointer"
            }`}
            onClick={onClick}
        >
            <div className="h-[300px] lg:h-auto w-full lg:max-w-[350px] flex-shrink-0">
                <img
                    className="w-full h-full object-cover"
                    src={uploadUrls?.length > 0 ? uploadUrls[0] : dummyImage}
                    alt={prodName}
                />
            </div>
            <div
                className={`relative bg-white w-full ${
                    status ? "pt-6" : "pt-10"
                } pl-5`}
            >
                {!status && (
                    <span className="font-light text-xs mb-1">
                        {formatDate(created)}
                    </span>
                )}
                {status && (
                    <div className="flex mb-7">
                        <span
                            className={`ml-auto font-semibold text-base uppercase px-2 rounded mr-4 ${
                                status === LISTING_STATUS.PENDING
                                    ? "text-purple-600 bg-[#9349DE33]"
                                    : status === LISTING_STATUS.SOLD &&
                                      "text-green bg-[#6CC04B33]"
                            }`}
                        >
                            {status === LISTING_STATUS.PENDING
                                ? "pending state"
                                : status === LISTING_STATUS.SOLD &&
                                  "sale confirmed"}
                        </span>
                    </div>
                )}
                <h2 className="text-base mb-5">{prodName}</h2>
                <span className="block text-base font-bold text-purple-500 mb-4">
                    {formatPrice(price)}
                </span>
                <div className="flex items-center py-5 lg:py-0">
                    <div className="border border-[#5B2BAE] bg-[#5B2BAE] w-[7px] h-[7px] rounded-full mr-2"></div>
                    <span className="capitalize">{`Condition - ${condition}`}</span>
                </div>
            </div>
        </div>
    );
}
