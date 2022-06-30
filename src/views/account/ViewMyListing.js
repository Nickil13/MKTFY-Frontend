import React, { useState } from "react";
import { ReactComponent as CameraIcon } from "../../assets/images/add_a_photo-24px.svg";
import { Button, Select, ImageSquare } from "../../components";
import {
    CATEGORY_TYPES,
    CITY_OPTIONS,
    CONDITIONS,
    LISTING_STATUS,
} from "../../data/variables";
import { useModalContext } from "../../context/ModalContext";
import { ReactComponent as CloseIcon } from "../../assets/images/orange_close-24.svg";
import { ListingInput, PriceInput } from "../../components/inputs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMyListingById } from "../../actions/listings";
import { formatPrice } from "../../utils/helpers";

export default function ViewMyListing() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const { setShowModal } = useModalContext();
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
    const handleSaveListing = (e) => {
        e.preventDefault();
        console.log("Saving listing...");
        navigate("/dashboard/account/my-listings");
    };

    const handleConfirmSold = () => {
        console.log("Confirming sold.");
        navigate("/dashboard/account/my-listings");
    };

    const handleCancelListing = () => {
        console.log("Cancelling the listing.");
        // Are you sure?
        navigate("/dashboard/account/my-listings");
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
                            {/* <div className="input-control">
                                <label
                                    className="capitalize text-gray-700 mb-3"
                                    htmlFor="price"
                                >
                                    Price
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
                                        placeholder="Type the price"
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                </div>
                            </div> */}
                            {/* <ListingInput
                                name="price"
                                value={price}
                                setValue={setPrice}
                                placeholder="Type the price"
                                lastchild
                            /> */}
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
                                width="w-full"
                                padding="py-4"
                                margins="mb-4 mt-7"
                                fontSize="text-xs"
                                color="gold"
                            >
                                Save changes
                            </Button>
                        )}
                        <Button
                            width="w-full"
                            fontSize="text-xs"
                            padding="py-4"
                            margins={`${!isAvailable && "mt-7"} mb-4`}
                            onClick={handleConfirmSold}
                        >
                            Confirm sold
                        </Button>
                        <Button
                            color="none"
                            width="w-full"
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
