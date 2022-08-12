import React from "react";
import { formatPrice } from "../../utils/helpers";

export default function ListingCard({
    prodName,
    category,
    images,
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
                    src={images.length > 0 && images[0]}
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

ListingCard.defaultProps = {
    title: "Pancakes",
    subtitle: "Breakfast delights",
    img: "https://images.unsplash.com/photo-1597699401474-e8714c1b7879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    price: "$ 12,299.99",
    condition: "new",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit fuga qui minima asperiores maiores ex ducimus corporis exercitationem expedita dolore. Ipsum aut, voluptate assumenda ipsa rem sapiente officia iste aliquam!",
};
