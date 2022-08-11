import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import { useModalContext } from "../../context/ModalContext";

export default function UploadImageModal({ addFiles }) {
    const imageDrop = React.useRef(null);
    const { setShowModal } = useModalContext();
    const [previewImages, setPreviewImages] = useState([]);
    const [listingImages, setListingImages] = useState([]);

    useEffect(() => {
        if (imageDrop.current !== null) {
            imageDrop.current.addEventListener("dragover", handleDragImage);
            imageDrop.current.addEventListener("drop", handleDropImage);

            // return () => {
            //     imageDrop.current.removeEventListener(
            //         "dragover",
            //         handleDragImage
            //     );
            //     imageDrop.current.removeEventListener("drop", handleDropImage);
            // };
        }
    }, [previewImages]);

    const handleDragImage = (e) => {
        e.preventDefault();
        e.stopPropagation();

        e.dataTransfer.dropEffect = "copy";
    };

    const handleDropImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("dropping");
        if (e.dataTransfer.files.length > 0) {
            handleSelectImages(e.dataTransfer.files);
        }
    };
    const handleSelectImages = (files) => {
        const totalLength = listingImages.length + files.length;
        if (files.length > 5 || totalLength > 5) {
            console.log("Maximum 5 images");
        } else {
            let newListingImages = [];
            let newPreviewImages = [];
            for (let i = 0; i < files.length; i++) {
                console.log(files.length);
                try {
                    const file = files[i];
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
    };
    const handleSelectImage = (e) => {
        if (e.target.files.length > 0) {
            handleSelectImages(e.target.files);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
        // Send all preview images and listing image files to the Create Listing Page
        addFiles(listingImages, previewImages);
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
                    } border-gray-100 rounded text-lg font-bold h-[386px]
                        border-4 border-dashed text-[#888889]/80`}
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
