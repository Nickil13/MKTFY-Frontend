import React from "react";
import { LISTING_STATUS } from "../../data/variables";
import { formatPrice, formatDate } from "../../utils/helpers";

export default function PurchasesCard({
    // images,
    uploads,
    created,
    prodName,
    price,
    condition,
    onClick,
    tag,
    purchaseTag,
}) {
    return (
        <div
            className={`flex max-w-[808px] h-[214px] shadow-[0px_1px_0px_#00000024] rounded-10 overflow-hidden ${
                onClick && "cursor-pointer"
            }`}
            onClick={onClick}
        >
            <div className="w-[350px] flex-shrink-0">
                <img
                    className="w-full h-full object-cover"
                    // src={images?.length > 0 ? images[0] : ""}
                    src={uploads?.length > 0 ? uploads[0] : ""}
                    alt={prodName}
                />
            </div>
            <div
                className={`relative bg-white w-full ${
                    tag ? "pt-6" : "pt-10"
                } pl-5`}
            >
                {!tag && (
                    <span className="font-light text-xs mb-1">
                        {formatDate(created)}
                    </span>
                )}
                {tag && (
                    <div className="flex mb-7">
                        <span
                            className={`ml-auto font-semibold text-base  uppercase px-2 rounded mr-4 ${
                                tag === LISTING_STATUS.PENDING
                                    ? "text-purple-600 bg-[#9349DE33]"
                                    : tag === LISTING_STATUS.SOLD &&
                                      "text-green bg-[#6CC04B33]"
                            }`}
                        >
                            {tag === LISTING_STATUS.PENDING
                                ? "pending state"
                                : tag === LISTING_STATUS.SOLD &&
                                  "sale confirmed"}
                        </span>
                    </div>
                )}
                {purchaseTag && (
                    <span
                        className={`absolute top-5 right-4 font-semibold text-base uppercase px-2 rounded ${
                            purchaseTag === "Pending"
                                ? "text-purple-600 bg-[#9349DE33]"
                                : purchaseTag === "Sold" &&
                                  "text-green bg-[#6CC04B33]"
                        }`}
                    >
                        {purchaseTag === "Pending"
                            ? "pending state"
                            : purchaseTag === "Sold" && "sale confirmed"}
                    </span>
                )}
                <h2 className="text-base mb-5">{prodName}</h2>
                <span className="block text-base font-bold text-purple-500 mb-4">
                    {formatPrice(price)}
                </span>
                <div className="flex items-center">
                    <div className="border border-[#5B2BAE] bg-[#5B2BAE] w-[7px] h-[7px] rounded-full mr-2"></div>
                    <span className="capitalize">{`Condition - ${condition}`}</span>
                </div>
            </div>
        </div>
    );
}
