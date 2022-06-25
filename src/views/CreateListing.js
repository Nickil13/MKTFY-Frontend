import React, { useState } from "react";
import { ReactComponent as CameraIcon } from "../assets/images/add_a_photo-24px.svg";
import { Button, Input, Select } from "../components";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../data/variables";
import { UploadImageModal } from "../components/modals";
import { useModalContext } from "../context/ModalContext";
import { ReactComponent as CloseIcon } from "../assets/images/orange_close-24.svg";

function ImageSquare({ image, imageName, active, handleRemoveImage, index }) {
    if (active)
        return (
            <div className="relative flex items-center justify-center w-[102px] h-[102px] border border-[#7070704D] rounded overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={image}
                    alt={imageName}
                />
                <button
                    className="absolute top-2.5 right-2.5 cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                >
                    <CloseIcon />
                </button>
            </div>
        );
    return (
        <div className="border border-purple-500 border-dashed rounded p-9">
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
    const { showModal, setShowModal } = useModalContext();
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
                <div className="bg-white p-8">
                    {/* Main Image */}
                    {!image ? (
                        <div className="flex items-center justify-center w-[480px] h-[320px] border-purple-500 border border-dashed rounded bg-beige-200">
                            <button onClick={() => setShowModal(true)}>
                                <CameraIcon className="mx-auto mb-2 w-[42px] h-[38px]" />
                                <p className="text-xs text-purple-500">
                                    Choose or drag up to 5 photos
                                </p>
                            </button>
                        </div>
                    ) : (
                        <div className="relative flex items-center justify-center w-[480px] h-[320px]  border-[#7070704D] border rounded overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src={image}
                                alt={imageName}
                            />
                            <button
                                className="absolute top-7 right-7 cursor-pointer"
                                onClick={() => handleRemoveImage(0)}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    )}
                    {/* Other Images */}
                    <div className="flex justify-between mt-4">
                        <ImageSquare
                            active={image}
                            image={image}
                            alt={imageName}
                            handleRemoveImage={handleRemoveImage}
                            index={1}
                        />
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
                            styleClass="listing-input-style"
                        />
                        <div className="input-control listing-input-style">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="resize-none"
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
                            phtextvalue="Select a category"
                            value={category}
                            setValue={setCategory}
                            phtext="text-[#2A2E43]/50"
                            padding="px-5 py-4"
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
                                fontSize=" text-xs"
                            />
                            <Input
                                name="price"
                                value={price}
                                setValue={setPrice}
                                styleClass="listing-input-style"
                            />
                        </div>
                        <Input
                            name="address"
                            value={address}
                            setValue={setAddress}
                            styleClass="listing-input-style"
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
                {/* Upload Image Modal */}
                {showModal && (
                    <div className="absolute flex items-center justify-center inset-0 bg-black bg-opacity-50">
                        <UploadImageModal
                            handleUploadImage={handleUploadImage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
