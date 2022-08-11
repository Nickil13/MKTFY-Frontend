import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import { useModalContext } from "../../context/ModalContext";

export default function UploadImageModal({ addFiles }) {
    const [imageName, setImageName] = useState("No File Chosen");
    const [uploadedImage, setUploadedImage] = useState(null);
    const imageDrop = React.useRef(null);
    const { setShowModal } = useModalContext();
    const [previewImages, setPreviewImages] = useState([]);
    const [listingImages, setListingImages] = useState([]);

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
    const handleSelectImage = (e) => {
        if (e.target.files.length > 0) {
            if (listingImages.length >= 5) {
                console.log("Maximum 5 images");
            } else {
                let newListingImages = [];
                let newPreviewImages = [];
                for (let i = 0; i < e.target.files.length; i++) {
                    console.log(e.target.files.length);
                    try {
                        const file = e.target.files[i];
                        const preview = URL.createObjectURL(file);
                        if (file.size > 2000000) {
                            console.log("Image size must be smaller than 2mb");
                        } else {
                            newListingImages.push(file);
                            newPreviewImages.push(preview);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
                setListingImages([...listingImages, ...newListingImages]);
                setPreviewImages([...previewImages, ...newPreviewImages]);
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
        // Send all preview images and listing image files to the Create Listing Page
        addFiles(listingImages, previewImages);
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
                        {`${listingImages.length} Images Chosen`}
                    </span>
                    <input
                        className="hidden"
                        type="file"
                        id="img"
                        name="img"
                        accept=".jpg, .jpeg, .png, .gif"
                        multiple
                        onChange={handleSelectImage}
                    />
                </div>

                <div
                    className={`grid grid-rows-1 grid-flow-col ${
                        previewImages.length > 3 && "grid-rows-2 auto-cols-fr"
                    } border-gray-100 rounded text-lg font-bold h-[386px] ${
                        uploadedImage
                            ? "bg-cover border m-0.5 text-transparent"
                            : "border-4 border-dashed text-[#888889]/80"
                    }`}
                    ref={imageDrop}
                >
                    {previewImages.length > 0
                        ? previewImages.map((preview, index) => {
                              return (
                                  <img
                                      src={preview}
                                      className="h-full w-full object-cover"
                                      alt="preview"
                                      key={index}
                                  />
                              );
                          })
                        : `Drop files here`}
                </div>
                <Button
                    type="submit"
                    margins="mt-7"
                    disabled={listingImages.length === 0}
                    centered
                >
                    Upload
                </Button>
            </form>
        </ModalWrapper>
    );
}
