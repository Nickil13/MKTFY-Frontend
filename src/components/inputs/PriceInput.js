import React from "react";

export default function PriceInput({ name, value, setValue }) {
    return (
        <div className="input-control">
            <label className="capitalize text-gray-700 mb-3" htmlFor="price">
                {name}
            </label>
            <div className="relative">
                <span className="absolute top-1/2 -translate-y-1/2 pl-5 text-xs">
                    $
                </span>
                <input
                    className="listing-input pl-7 w-full"
                    type="text"
                    name="price"
                    id="price"
                    maxLength={50}
                    placeholder="Type the price"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    );
}

PriceInput.defaultProps = {
    name: "price",
};
