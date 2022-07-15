import React, { useState } from "react";
import { Button, ListingImages, Select } from "../../components";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import { ListingInput } from "../../components/inputs";

export default function CreateListing() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");

    const handleCreateListing = (e) => {
        e.preventDefault();
        console.log("Creating listing...");
    };

    const handleUploadImage = (uploadedImage, imageName) => {
        console.log("Uploading image");
        setImage(uploadedImage);
        setImageName(imageName);
    };

    const handleRemoveImage = (index) => {
        console.log(`Removing image at index: ${index}`);
    };
    return (
        <div className="mt-7 max-w-[1448px]">
            <h1 className="text-gray-500 font-bold text-lg mb-8">
                Create Listing
            </h1>
            <div className="flex rounded-[10px] shadow-modal overflow-hidden">
                {/* Images */}
                <ListingImages
                    images={[]}
                    handleRemoveImage={handleRemoveImage}
                />

                {/* Product Info */}
                <div className="w-[904px] bg-beige-200 p-8">
                    <form
                        onSubmit={handleCreateListing}
                        className="max-w-[520px]"
                    >
                        <ListingInput
                            name="product name"
                            value={name}
                            setValue={setName}
                        />

                        <div className="input-control mb-[18px]">
                            <label
                                htmlFor="description"
                                className="capitalize text-gray-700 mb-3"
                            >
                                Description
                            </label>
                            <textarea
                                className="resize-none listing-input"
                                name="description"
                                id="description"
                                placeholder="Your description"
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <Select
                            name="category"
                            options={CATEGORY_TYPES}
                            value={category}
                            setValue={setCategory}
                            phcolor="text-[#2A2E43]/50"
                            styleClass="listing-input-style"
                            margins="mb-[18px]"
                        />
                        <div className="grid grid-cols-2 gap-3 mt-4 mb-[18px]">
                            <Select
                                name="condition"
                                options={CONDITIONS}
                                value={condition}
                                setValue={setCondition}
                                phcolor="text-[#2A2E43]/50"
                                styleClass="listing-input-style"
                            />
                            <ListingInput
                                name="price"
                                value={price}
                                setValue={setPrice}
                                placeholder="Type the price"
                                lastchild
                            />
                        </div>
                        <ListingInput
                            name="address"
                            value={address}
                            setValue={setAddress}
                        />
                        <Select
                            name="city"
                            options={CITY_OPTIONS}
                            value={city}
                            setValue={setCity}
                            phcolor="text-[#2A2E43]/50"
                            styleClass="listing-input-style"
                        />
                        <Button
                            type="submit"
                            padding="py-4"
                            margins="mb-5 mt-10"
                            fontSize="text-xs"
                            disabled
                        >
                            Post Your Listing
                        </Button>
                        <Button color="none" fontSize="text-xs" padding="py-4">
                            Cancel
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
