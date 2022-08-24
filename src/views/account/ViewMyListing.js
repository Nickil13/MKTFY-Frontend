import React, { useState } from "react";
import { Select } from "../../components";
import { CATEGORY_TYPES, CITY_OPTIONS, CONDITIONS } from "../../data/variables";
import { useModalContext } from "../../context/ModalContext";
import { ListingInput, PriceInput } from "../../components/inputs";
import { useNavigate, useParams } from "react-router-dom";
import { ListingImages } from "../../components";
import Alert from "../../components/Alert";
import { UploadImageModal } from "../../components/modals";
import { useListingContext } from "../../context/ListingContext";

export default function ViewMyListing() {
    const { setShowAlert, showAlert, resetAlert, cancelAlert, showModal } =
        useModalContext();
    const { currentListing: listing, getListingById } = useListingContext();
    const [prodName, setProdName] = useState(listing?.prodName || "");
    const [description, setDescription] = useState(listing?.description || "");
    const [category, setCategory] = useState(listing?.category || "");
    const [condition, setCondition] = useState(listing?.condition || "");
    const [price, setPrice] = useState(
        listing?.price ? listing.price.toFixed(2) : ""
    );
    const [address, setAddress] = useState(listing?.address || "");
    const [city, setCity] = useState(listing?.city || "");

    const [previewImages, setPreviewImages] = useState(
        listing?.uploadUrls || []
    );
    const [listingImages, setListingImages] = useState([]);
    const isEditable = listing?.status === "Active" || false;

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
        if (!listing || listing.id !== id) {
            getListingById(id);
        }
    }, [listing, id]);

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
