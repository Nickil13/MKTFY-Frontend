import React from "react";
import { formatPrice } from "../../utils/helpers";

export default function PurchasesCard({
    image,
    date,
    title,
    price,
    condition,
    onClick,
}) {
    return (
        <div
            className="flex max-w-[808px] h-[214px] shadow-[0px_1px_0px_#00000024] rounded-[10px] overflow-hidden"
            onClick={onClick}
        >
            <div className="w-[350px] flex-shrink-0">
                <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={title}
                />
            </div>
            <div className="bg-white w-full pt-10 pl-5">
                <span className="font-light text-xs mb-1">{date}</span>
                <h2 className="text-base mb-5">{title}</h2>
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
