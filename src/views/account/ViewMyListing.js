import React, { useState } from "react";
import { Button, Select } from "../../components";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import { useModalContext } from "../../context/ModalContext";
import { ListingInput, PriceInput } from "../../components/inputs";
import { useNavigate, useParams } from "react-router-dom";
import { getListingById } from "../../actions/listings";
import { ListingImages } from "../../components";
import Alert from "../../components/Alert";
import { UploadImageModal } from "../../components/modals";

const dummyImages = [
    "https://images.unsplash.com/photo-1509326066092-14b2e882fe86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1452711932549-e7ea7f129399?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80",
    "https://images.unsplash.com/reserve/unsplash_524010c76b52a_1.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];
export default function ViewMyListing() {
    const [prodName, setProdName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const { setShowAlert, showAlert, resetAlert, cancelAlert, showModal } =
        useModalContext();
    const [previewImages, setPreviewImages] = useState([]);
    const [listingImages, setListingImages] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    let navigate = useNavigate();
    const { id } = useParams();
    // const token = sessionStorage.getItem("access_token");
    // const multipartHeader = {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${token}`,
    //     },
    // };
    React.useEffect(() => {
        if (!prodName) {
            getListingById(id).then((res) => {
                console.log(res);
                if (res) {
                    setProdName(res.prodName);
                    setDescription(res.description);
                    setCategory(res.category);
                    setCondition(res.condition);
                    setPrice(res.price.toFixed(2));
                    setAddress(res.address);
                    setCity(res.city);
                    if (res.status === "Active") {
                        setIsEditable(true);
                    }
                    // remove this when images available
                    if (res.uploadUrls) {
                        setPreviewImages([...res.uploadUrls]);
                    } else {
                        setPreviewImages(dummyImages);
                    }
                }
            });
        }
    }, []);

    const handleCancelListing = () => {
        console.log("confirmed alert: cancelling the listing");
        resetAlert();
        // Loading success page
        navigate("/loading", {
            state: { redirect: "/dashboard/account/my-listings" },
        });
    };
    const handleSaveListing = (e) => {
        e.preventDefault();
        console.log("Saving listing...");
        navigate("/dashboard/account/my-listings");
    };

    const handleConfirmSold = () => {
        console.log("Confirming sold.");
        navigate("/dashboard/account/my-listings/sold");
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
            <h1 className="text-gray-500 font-bold text-lg mb-8">My Listing</h1>
            <div className="flex flex-col rounded-10 shadow-modal overflow-hidden 2xl:flex-row">
                {/* Images */}
                <ListingImages
                    images={previewImages}
                    handleRemoveImage={handleRemoveImage}
                />

                {/* Product Info */}
                <div className="bg-beige-200 p-8 2xl:w-[904px]">
                    <form
                        onSubmit={handleSaveListing}
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
                        {isEditable && (
                            <button
                                type="submit"
                                className="btn-gold-new py-4 mb-4 mt-7 text-xs"
                            >
                                Save changes
                            </button>
                        )}
                        <button
                            type="button"
                            className={`btn-purple-new py-4 ${
                                !isEditable && "mt-7"
                            } mb-4 text-xs`}
                            onClick={handleConfirmSold}
                        >
                            Confirm sold
                        </button>
                        <button
                            type="button"
                            className="btn-transparent-new text-xs py-4"
                            onClick={() => setShowAlert(true)}
                        >
                            Cancel Listing
                        </button>
                    </form>
                </div>
            </div>
            {showAlert && (
                <Alert
                    message="You are about to cancel your listing. Are you sure?"
                    confirmBtnText="Yes"
                    onConfirm={handleCancelListing}
                    onCancel={cancelAlert}
                />
            )}
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
