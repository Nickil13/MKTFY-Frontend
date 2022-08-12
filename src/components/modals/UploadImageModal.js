import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import { useModalContext } from "../../context/ModalContext";

const MAX_FILE_SIZE = 1500000;
const MAX_IMAGES = 5;
const IMAGE_FORMATS = ["jpg", "png", "jpeg", "gif"];

export default function UploadImageModal({ addFiles, listingImages }) {
    const imageDrop = React.useRef(null);
    const { setShowModal } = useModalContext();
    const [previews, setPreviews] = useState([]);
    const [images, setImages] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [formatError, setFormatError] = useState("");

    useEffect(() => {
        if (imageDrop && imageDrop.current) {
            // Save the reference so that we don't get a null error when the component unmounts.
            let drop = imageDrop.current;
            drop.addEventListener("dragover", handleDragImage);
            drop.addEventListener("drop", handleDropImage);

            return () => {
                drop.removeEventListener("dragover", handleDragImage);
                drop.removeEventListener("drop", handleDropImage);
            };
        }
    }, [images]);

    const handleDragImage = (e) => {
        e.preventDefault();
        e.stopPropagation();

        e.dataTransfer.dropEffect = "copy";
    };

    const handleDropImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files.length > 0) {
            // Check to make sure files match required format jpg/jpeg/png/gif
            let correctFormat = true;

            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                const file = e.dataTransfer.files[i];
                const fileType = file.name.split(".")[1];

                if (!IMAGE_FORMATS.includes(fileType)) {
                    console.log(`File type ${fileType} not supported.`);
                    correctFormat = false;
                }
            }
            if (correctFormat) {
                handleSelectImages(e.dataTransfer.files);
            } else {
                setFormatError(
                    "One or more of the files has an incorrect format. Accepted types: jpg, jpeg, png, gif"
                );
            }
        }
    };
    const handleSelectImages = (files) => {
        /* Check how many images have already been selected, how many images are being added as files and how many images have already been passed to the parent component Create Listing */
        const totalLength = images.length + files.length + listingImages.length;
        formatError && setFormatError("");
        if (files.length > MAX_IMAGES || totalLength > MAX_IMAGES) {
            setFormatError(
                `Maximum 5 images per listing${
                    listingImages.length > 0
                        ? `: Already added (${listingImages.length})`
                        : ""
                }`
            );
        } else {
            let newImages = [];
            let newPreviews = [];
            let newNames = [];
            for (let i = 0; i < files.length; i++) {
                try {
                    const file = files[i];
                    const preview = URL.createObjectURL(file);
                    if (file.size > MAX_FILE_SIZE) {
                        setFormatError("Image size must be smaller than 1.5mb");
                    } else {
                        newImages.push(file);
                        newPreviews.push(preview);
                        newNames.push(file.name);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            setImages([...images, ...newImages]);
            setPreviews([...previews, ...newPreviews]);
            setFileNames([...fileNames, ...newNames]);
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
        addFiles(images, previews);
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
                        {/* {`${images.length} Images Chosen`} */}
                        {`${
                            images.length > 1 ? `(${images.length})` : ""
                        } ${fileNames.join(", ")}`}
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
                        previews.length > 3 && "grid-rows-2 auto-cols-fr"
                    } border-gray-100 rounded text-lg font-bold h-[386px]
                        border-4 border-dashed text-[#888889]/80`}
                    ref={imageDrop}
                >
                    {previews.length > 0
                        ? previews.map((preview, index) => {
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
                <div className="py-1">
                    <p
                        className={`text-red ${
                            formatError ? "block" : "hidden"
                        }`}
                    >
                        {formatError}
                    </p>
                </div>
                <Button
                    type="submit"
                    margins="mt-5"
                    disabled={images.length === 0}
                    centered
                >
                    Upload
                </Button>
            </form>
        </ModalWrapper>
    );
}
