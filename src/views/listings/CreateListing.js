import React, { useState } from "react";
import { Button, ListingImages, Select } from "../../components";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import { ListingInput, PriceInput } from "../../components/inputs";
import { UploadImageModal } from "../../components/modals";
import { useModalContext } from "../../context/ModalContext";
import axios from "../../utils/request";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
    const [prodName, setProdName] = useState("Test listing");
    const [description, setDescription] = useState("This is a test.");
    const [category, setCategory] = useState("electronics");
    const [condition, setCondition] = useState("new");
    const [price, setPrice] = useState("100.00");
    const [address, setAddress] = useState("123 Street");
    const [city, setCity] = useState("Calgary");
    const { showModal } = useModalContext();
    const [previewImages, setPreviewImages] = useState([]);
    const [listingImages, setListingImages] = useState([]);
    let navigate = useNavigate();
    const token = sessionStorage.getItem("access_token");
    const multipartHeader = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };

    const handleCreateListing = (e) => {
        e.preventDefault();
        try {
            if (listingImages.length > 0) {
                let apicalls = [];
                listingImages.forEach((image) => {
                    let body = new FormData();
                    body.append("File", image);
                    apicalls.push(axios.post("/Upload", body, multipartHeader));
                });

                Promise.all(apicalls)
                    .then((values) => {
                        const imageIds = values.map((value) => value[0].id);
                        const body = {
                            prodName,
                            description,
                            category,
                            condition,
                            price: Number(price),
                            address,
                            city,
                            uploadIds: [...imageIds],
                        };

                        axios
                            .post("/Listing", body)
                            .then((res) => {
                                if (res) {
                                    //Successfully redirect via load screen to HOME
                                    navigate("/loading", {
                                        state: { redirect: "/dashboard" },
                                    });
                                }
                            })
                            .catch((error) => console.error(error));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addFiles = (newListingImages, newPreviewImages) => {
        setListingImages([...listingImages, ...newListingImages]);
        setPreviewImages([...previewImages, ...newPreviewImages]);
    };

    const handleRemoveImage = (index) => {
        const newPreviews = previewImages.filter(
            (preview) => previewImages.indexOf(preview) !== index
        );
        const newListingImages = listingImages.filter(
            (image) => listingImages.indexOf(image) !== index
        );
        setPreviewImages(newPreviews);
        setListingImages(newListingImages);
    };

    return (
        <div className="mt-7 max-w-[1448px]">
            <h1 className="text-gray-500 font-bold text-lg mb-8">
                Create Listing
            </h1>
            <div className="flex flex-col rounded-10 shadow-modal overflow-hidden 2xl:flex-row">
                {/* Images */}
                <ListingImages
                    images={previewImages}
                    handleRemoveImage={handleRemoveImage}
                />

                {/* Product Info */}
                <div className="bg-beige-200 p-8 2xl:w-[904px]">
                    <form
                        onSubmit={handleCreateListing}
                        className="max-w-[520px] mx-auto"
                    >
                        <ListingInput
                            name="product name"
                            value={prodName}
                            setValue={setProdName}
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
                        <div className="grid md:grid-cols-2 gap-3 mt-4 mb-[18px]">
                            <Select
                                name="condition"
                                options={CONDITIONS}
                                value={condition}
                                setValue={setCondition}
                                phcolor="text-[#2A2E43]/50"
                                styleClass="listing-input-style"
                            />
                            <PriceInput value={price} setValue={setPrice} />
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
                        <button
                            type="submit"
                            className="btn-purple-new py-4 text-xs mb-5 mt-10"
                            disabled={
                                !prodName ||
                                !description ||
                                !category ||
                                !condition ||
                                !price ||
                                !address ||
                                !city ||
                                listingImages.length === 0
                            }
                        >
                            Post Your Listing
                        </button>
                        <button
                            type="button"
                            className="btn-transparent-new py-4 text-xs"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>

            {/* Upload Image Modal */}
            {showModal && (
                <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 h-screen z-[70]">
                    <UploadImageModal
                        addFiles={addFiles}
                        listingImages={listingImages}
                    />
                </div>
            )}
        </div>
    );
}
