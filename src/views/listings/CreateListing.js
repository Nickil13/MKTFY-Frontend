import React, { useState } from "react";
import { Button, ListingImages, Select } from "../../components";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import { ListingInput } from "../../components/inputs";
import { UploadImageModal } from "../../components/modals";
import { useModalContext } from "../../context/ModalContext";
import axios from "axios";
import serviceAxios from "../../utils/request";

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
    const { showModal } = useModalContext();
    const [file, setFile] = useState(null);
    const [imageId, setImageId] = useState("");
    const [previewImages, setPreviewImages] = useState([]);
    const [listingImages, setListingImages] = useState([]);

    const handleCreateListing = (e) => {
        e.preventDefault();
        console.log("Creating listing...");
        uploadImage();
    };

    const uploadImage = async () => {
        const token = sessionStorage.getItem("access_token");
        const multipartHeader = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const body = new FormData();
        body.append("File", file);
        console.log(body);
        await axios
            .post(
                "http://marketforyouyh-env.eba-fqgiudi2.ca-central-1.elasticbeanstalk.com/api/Upload",
                body,
                multipartHeader
            )
            .then((res) => {
                const imageId = res.data[0].id;
                console.log(imageId);
                setImageId(imageId);
                //Create the listing!
                //createListing(imageId);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const createListing = async (id) => {
        const body = {
            prodName: "TeaTesting!",
            description: "A soothing cup of tea.",
            category: "electronics",
            condition: "used",
            price: 4.25,
            address: "123 Relaxation Lane",
            city: "Calgary",
            uploadIds: [id],
        };
        console.log(body);
        try {
            const res = await serviceAxios.post("/Listing", body);
            return res;
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    const addFiles = (newListingImages, newPreviewImages) => {
        setListingImages([...listingImages, ...newListingImages]);
        setPreviewImages([...previewImages, ...newPreviewImages]);
    };

    const handleRemoveImage = (index) => {
        console.log(`Removing image at index: ${index}`);
    };
    return (
        <div className="mt-7 max-w-[1448px]">
            <h1 className="text-gray-500 font-bold text-lg mb-8">
                Create Listing
            </h1>
            <div className="flex rounded-10 shadow-modal overflow-hidden">
                {/* Images */}
                <ListingImages
                    images={previewImages}
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
                            // disabled={!name || !description || !category || !condition || !price || !address || !city || !image}
                        >
                            Post Your Listing
                        </Button>
                        <Button color="none" fontSize="text-xs" padding="py-4">
                            Cancel
                        </Button>
                    </form>
                </div>
            </div>
            {/* Upload Image Modal */}
            {showModal && (
                <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 h-screen z-[70]">
                    <UploadImageModal addFiles={addFiles} />
                </div>
            )}
        </div>
    );
}
