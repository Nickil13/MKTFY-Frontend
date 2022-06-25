import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import { useModalContext } from "../../context/ModalContext";

export default function UploadImageModal({ handleUploadImage }) {
    const [imageName, setImageName] = useState("No File Chosen");
    const [uploadedImage, setUploadedImage] = useState(null);
    const imageDrop = React.useRef(null);
    const { setShowModal } = useModalContext();

    useEffect(() => {
        if (imageDrop.current !== null) {
            imageDrop.current.addEventListener("dragover", handleDragImage);
            imageDrop.current.addEventListener("drop", handleDropImage);
        }
    }, []);

    const handleDragImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const handleDropImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const fileList = e.dataTransfer.files;
        if (fileList[0]) {
            setImageName(fileList[0].name);
            readImage(fileList[0]);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Upload Image
        handleUploadImage(uploadedImage, imageName);
        setShowModal(false);
    };

    const readImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            let result = reader.result;
            setUploadedImage(result);
            if (imageDrop.current) {
                imageDrop.current.style.backgroundImage = `url(${result})`;
            }
        };
    };

    const handleSelectImage = (e) => {
        let file = e.target.files[0];

        if (file) {
            readImage(file);
            setImageName(e.target.value);
        }
    };

    return (
        <ModalWrapper maxWidth="max-w-[946px]" padding="px-28 py-15">
            <h1 className="text-purple-100 text-center font-bold mb-8">
                Upload Photo(s)
            </h1>
            <form
                className="w-full flex flex-col content-center"
                onSubmit={onSubmit}
            >
                <div className="flex items-center mb-5">
                    <label
                        htmlFor="img"
                        className="w-[256px] rounded border border-[#6B6B6C53] text-gray-footer text-base font-semibold text-center bg-[#8888892E] mr-5 cursor-pointer  py-1.5"
                    >
                        Choose Files
                    </label>
                    <span className="text-gray-footer font-light text-base">
                        {imageName}
                    </span>
                    <input
                        className="hidden"
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        onChange={handleSelectImage}
                    />
                </div>

                <div
                    className={`flex items-center justify-center border-gray-100 rounded text-lg font-bold py-40 ${
                        uploadedImage
                            ? "bg-cover border m-0.5 text-transparent"
                            : "border-4 border-dashed text-[#888889]/80"
                    }`}
                    ref={imageDrop}
                >
                    Drop files here
                </div>
                <Button
                    type="submit"
                    margins="mt-7"
                    disabled={!uploadedImage}
                    centered
                >
                    Upload
                </Button>
            </form>
        </ModalWrapper>
    );
}
