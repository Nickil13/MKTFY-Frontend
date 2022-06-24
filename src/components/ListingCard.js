import React from "react";
import { formatPrice } from "../utils/helpers";

export default function ListingCard({
    ProdName,
    Category,
    Images,
    Price,
    Condition,
    Description,
    onClick,
}) {
    return (
        <div
            className="flex py-6 px-14 min-h-listing-card cursor-pointer"
            onClick={onClick}
        >
            <div className="max-w-card min-w-card h-card-img shadow-card rounded-lg overflow-hidden">
                <img
                    className="
                                object-cover w-full h-full"
                    src={Images[0]}
                    alt={ProdName}
                />
            </div>
            <div className="ml-12">
                <div className="text-base mb-5">
                    <h2>{ProdName}</h2>
                    <p className="capitalize">{Category}</p>
                </div>

                <p className="text-purple-500 text-base font-bold">
                    {formatPrice(Price)}
                </p>
                <span className="inline-block condition-tag">{Condition}</span>
                <p className="text-[18px]">{Description}</p>
            </div>
        </div>
    );
}

ListingCard.defaultProps = {
    title: "Pancakes",
    subtitle: "Breakfast delights",
    img: "https://images.unsplash.com/photo-1597699401474-e8714c1b7879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    price: "$ 12,299.99",
    condition: "new",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fuga qui minima asperiores maiores ex ducimus corporis exercitationem expedita dolore. Ipsum aut, voluptate assumenda ipsa rem sapiente officia iste aliquam!",
};
