import React from "react";
import { formatPrice } from "../../utils/helpers";

export default function PurchasesCard({
    Images,
    DatePurchased,
    ProdName,
    Price,
    Condition,
    onClick,
    tag,
}) {
    return (
        <div
            className="flex max-w-[808px] h-[214px] shadow-[0px_1px_0px_#00000024] rounded-[10px] overflow-hidden"
            onClick={onClick}
        >
            <div className="w-[350px] flex-shrink-0">
                <img
                    className="w-full h-full object-cover"
                    src={Images[0]}
                    alt={ProdName}
                />
            </div>
            <div className={`bg-white w-full ${tag ? "pt-6" : "pt-10"} pl-5`}>
                <span className="font-light text-xs mb-1">{DatePurchased}</span>
                {tag && (
                    <div className="flex mb-7">
                        <span
                            className={`ml-auto font-semibold text-base  uppercase px-2 rounded mr-4 ${
                                tag === "pending"
                                    ? "text-purple-600 bg-[#9349DE33]"
                                    : tag === "sold" &&
                                      "text-green bg-[#6CC04B33]"
                            }`}
                        >
                            {tag === "pending"
                                ? "pending state"
                                : tag === "sold" && "sale confirmed"}
                        </span>
                    </div>
                )}
                <h2 className="text-base mb-5">{ProdName}</h2>
                <span className="block text-base font-bold text-purple-500 mb-4">
                    {formatPrice(Price)}
                </span>
                <div className="flex items-center">
                    <div className="border border-[#5B2BAE] bg-[#5B2BAE] w-[7px] h-[7px] rounded-full mr-2"></div>
                    <span className="capitalize">{`Condition - ${Condition}`}</span>
                </div>
            </div>
        </div>
    );
}
