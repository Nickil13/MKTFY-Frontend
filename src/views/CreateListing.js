import React, { useState } from "react";
import { ReactComponent as CameraIcon } from "../assets/images/add_a_photo-24px.svg";
import { Button, Input, Select } from "../components";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../data/variables";

function ImageSquare() {
    return (
        <div className="border border-purple-500 border-dashed border-t rounded p-9">
            <CameraIcon />
        </div>
    );
}
export default function CreateListing() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    const handleCreateListing = (e) => {
        e.preventDefault();
        console.log("Creating listing...");
    };

    return (
        <div className="mt-7 max-w-[1448px]">
            <h1 className="text-gray-500 font-bold text-lg mb-8">
                Create Listing
            </h1>
            <div className="flex rounded-[10px] shadow-modal overflow-hidden">
                {/* Images */}
                <div className="bg-white p-8">
                    {/* Main Image */}
                    <div className="flex items-center justify-center w-[480px] h-[320px]  border-purple-500 border border-dashed  rounded bg-beige-200">
                        <div>
                            <CameraIcon className="mx-auto mb-2 w-[42px] h-[38px]" />
                            <p className="text-xs text-purple-500">
                                Choose or drag up to 5 photos
                            </p>
                        </div>
                    </div>
                    {/* Other Images */}
                    <div className="flex justify-between mt-3">
                        <ImageSquare />
                        <ImageSquare />
                        <ImageSquare />
                        <ImageSquare />
                    </div>
                </div>

                {/* Product Info */}
                <div className="w-[904px] bg-beige-200 p-8">
                    <form
                        onSubmit={handleCreateListing}
                        className="max-w-[520px]"
                    >
                        <Input
                            name="product name"
                            value={name}
                            setValue={setName}
                            style="listing"
                        />
                        <div className="input-control mb-4">
                            <label
                                className="mb-2.5 text-gray-700 text-xs"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <textarea
                                className="resize-none px-5 py-4 rounded border border-[#D1D1D1] text-xs focus:outline-purple-400 focus:outline-1"
                                name="description"
                                id="description"
                                placeholder="Your description"
                                rows="5"
                            />
                        </div>

                        <Select
                            name="category"
                            options={CATEGORY_TYPES}
                            phtextvalue="Select a category"
                            value={category}
                            setValue={setCategory}
                            phtext="text-[#2A2E43]/50"
                            padding="px-5 py-4"
                            style="listing"
                            fontSize=" text-xs"
                        />
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <Select
                                name="condition"
                                options={CONDITIONS}
                                phtextvalue="Select a condition"
                                value={condition}
                                setValue={setCondition}
                                phtext="text-[#2A2E43]/50 text-xs"
                                padding="px-5 py-4"
                                style="listing"
                                fontSize=" text-xs"
                            />
                            <Input
                                name="price"
                                value={price}
                                setValue={setPrice}
                                style="listing"
                            />
                        </div>
                        <Input
                            name="address"
                            value={address}
                            setValue={setAddress}
                            style="listing"
                            lastchild
                        />
                        <Select
                            name="city"
                            options={CITY_OPTIONS}
                            phtextvalue="Select a city"
                            value={city}
                            setValue={setCity}
                            phtext="text-[#2A2E43]/50 text-xs"
                            padding="px-5 py-4"
                            style="listing"
                            fontSize=" text-xs"
                        />
                        <Button
                            type="submit"
                            width="w-full"
                            padding="py-4"
                            margins="mb-5 mt-10"
                            fontSize="text-xs"
                            disabled
                        >
                            Post Your Listing
                        </Button>
                        <Button
                            color="none"
                            width="w-full"
                            fontSize="text-xs"
                            padding="py-4"
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
