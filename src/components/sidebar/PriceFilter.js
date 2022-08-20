import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PriceFilter() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [fromPrice, setFromPrice] = useState(
        searchParams?.get("fromPrice") || ""
    );
    const [toPrice, setToPrice] = useState(searchParams?.get("toPrice") || "");
    const [priceError, setPriceError] = useState("");

    const checkValidPrice = () => {
        const pattern = /^\d*\.?\d*$/;

        const isValidFromPrice = pattern.test(fromPrice);
        const isValidToPrice = pattern.test(toPrice);

        if (isValidFromPrice && isValidToPrice) {
            priceError && setPriceError("");
        } else {
            setPriceError("Please enter a valid price.");
        }
    };

    const updatePrice = (e) => {
        e.preventDefault();
        const validRange = toPrice - fromPrice > 0;

        if (!validRange) {
            if (!toPrice && !fromPrice) {
                searchParams.delete("fromPrice");
                searchParams.delete("toPrice");
                setSearchParams(searchParams);
            }
            setPriceError("Not a valid price range.");
        } else {
            searchParams.set("fromPrice", fromPrice);
            searchParams.set("toPrice", toPrice);
            setSearchParams(searchParams);
        }
    };
    return (
        <div className="py-[22px]">
            <h2 className="text-base font-semibold ml-5 mb-4 ">Price</h2>

            <form className="flex flex-col item-center" onSubmit={updatePrice}>
                <div className="flex px-12">
                    <div className="flex flex-col mr-11">
                        <label htmlFor="fromPrice" className="text-gray-500">
                            From
                        </label>
                        <input
                            className="p-2 max-w-[123px] border border-footer-border rounded"
                            type="text"
                            name="fromPrice"
                            id="fromPrice"
                            value={fromPrice}
                            onChange={(e) => setFromPrice(e.target.value)}
                            onBlur={checkValidPrice}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="toPrice" className="text-gray-500">
                            To
                        </label>
                        <input
                            className="p-2 max-w-[123px] border border-footer-border rounded"
                            type="text"
                            name="toPrice"
                            id="toPrice"
                            value={toPrice}
                            onChange={(e) => setToPrice(e.target.value)}
                            onBlur={checkValidPrice}
                        />
                    </div>
                </div>
                <p
                    className={`pt-4 h-[30px] text-center ${
                        priceError && (toPrice || fromPrice)
                            ? "text-red"
                            : "text-transparent"
                    }`}
                >
                    {priceError}
                </p>

                <button
                    type="submit"
                    className="btn-gold-new w-auto text-xs py-3 px-4 mt-5 mb-3 mx-auto"
                    disabled={priceError}
                >
                    Update
                </button>
            </form>
        </div>
    );
}
