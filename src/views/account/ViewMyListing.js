import React, { useState } from "react";
import { Button, Select } from "../../components";
import {
    CATEGORY_TYPES,
    CITY_OPTIONS,
    CONDITIONS,
    LISTING_STATUS,
} from "../../data/variables";
import { useModalContext } from "../../context/ModalContext";
import { ListingInput, PriceInput } from "../../components/inputs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMyListingById } from "../../actions/listings";
import { ListingImages } from "../../components";

export default function ViewMyListing() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const { setShowAlert, setAlertType, alertConfirmed, resetAlert } =
        useModalContext();
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    let location = useLocation();
    let navigate = useNavigate();
    const { id } = useParams();
    const isAvailable =
        location.state?.status?.toUpperCase() === LISTING_STATUS.AVAILABLE;

    React.useEffect(() => {
        if (!name) {
            const data = getMyListingById(id);
            if (data) {
                setName(data.ProdName);
                setDescription(data.Description);
                setCategory(data.Category);
                setCondition(data.Condition);
                setAddress(data.Address);
                setCity(data.City);
                setPrice(data.Price.toFixed(2));
                setImage(data.Images[0]);
            }
        }
    }, []);

    React.useEffect(() => {
        // User opted to confirm alert
        if (alertConfirmed) {
            console.log("confirmed alert: cancelling the listing");
            resetAlert();
            // Loading success page
            navigate("/loading", {
                state: { redirect: "/dashboard/account/my-listings" },
            });
        }
    }, [alertConfirmed]);

    const handleSaveListing = (e) => {
        e.preventDefault();
        console.log("Saving listing...");
        navigate("/dashboard/account/my-listings");
    };

    const handleConfirmSold = () => {
        console.log("Confirming sold.");
        navigate("/dashboard/account/my-listings/sold");
    };

    const handleCancelListing = () => {
        setAlertType("cancel-listing");
        setShowAlert(true);
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
            <h1 className="text-gray-500 font-bold text-lg mb-8">My Listing</h1>
            <div className="flex flex-col rounded-[10px] shadow-modal overflow-hidden 2xl:flex-row">
                {/* Images */}
                <ListingImages
                    images={[image]}
                    handleRemoveImage={handleRemoveImage}
                />

                {/* Product Info */}
                <div className="w-[904px] bg-beige-200 p-8">
                    <form
                        onSubmit={handleSaveListing}
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
                        {isAvailable && (
                            <Button
                                type="submit"
                                padding="py-4"
                                margins="mb-4 mt-7"
                                fontSize="text-xs"
                                color="gold"
                            >
                                Save changes
                            </Button>
                        )}
                        <Button
                            fontSize="text-xs"
                            padding="py-4"
                            margins={`${!isAvailable && "mt-7"} mb-4`}
                            onClick={handleConfirmSold}
                        >
                            Confirm sold
                        </Button>
                        <Button
                            color="none"
                            fontSize="text-xs"
                            padding="py-4"
                            onClick={handleCancelListing}
                        >
                            Cancel Listing
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
