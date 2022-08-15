import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as BackArrow } from "../assets/images/icon_nav_back.svg";
import { ReactComponent as ForwardArrow } from "../assets/images/Icon_nav_forward.svg";

const MAX_PAGINATION_SQ = 4;

export default function Pagination({ page, pages }) {
    let [searchParams, setSearchParams] = useSearchParams();
    const [showAll, setShowAll] = useState(page > MAX_PAGINATION_SQ);
    const pageNumbers = showAll
        ? [...Array(pages).keys()]
        : [...Array(pages).keys()].slice(0, MAX_PAGINATION_SQ);

    const handlePageClick = (pageNum) => {
        searchParams.set("page", pageNum + 1);
        setSearchParams(searchParams);
    };

    const handlePreviousClick = () => {
        const newPage = page - 1;
        if (newPage > 0) {
            searchParams.set("page", newPage);
            setSearchParams(searchParams);
        }
    };

    const handleNextClick = () => {
        const newPage = Number(page) + 1;
        console.log(newPage);
        if (newPage <= pages) {
            searchParams.set("page", newPage);
            setSearchParams(searchParams);
        }
    };

    return (
        pages > 1 && (
            <div className="flex items-center justify-center">
                <button
                    className={`${Number(page) - 1 === 0 ? "invisible" : ""}`}
                    onClick={handlePreviousClick}
                >
                    <BackArrow className="fill-[#89909B] mr-4 md:mr-7" />
                </button>

                <ul className="flex gap-2 md:gap-5">
                    {pageNumbers.map((pageNum) => {
                        return (
                            <PaginationSquare
                                key={pageNum}
                                value={pageNum + 1}
                                page={page}
                                onClick={() => handlePageClick(pageNum)}
                            />
                        );
                    })}
                    {pages > MAX_PAGINATION_SQ && !showAll && (
                        <PaginationSquare
                            onClick={() => setShowAll(true)}
                            value="..."
                        />
                    )}
                </ul>

                <button
                    className={`${Number(page) === pages ? "invisible" : ""}`}
                    onClick={handleNextClick}
                >
                    <ForwardArrow className="fill-[#89909B] ml-4 md:ml-7" />
                </button>
            </div>
        )
    );
}

const PaginationSquare = ({ value, page, onClick }) => {
    return (
        <li
            className={`flex items-center justify-center text-sm-16
            md:text-[1.5rem] font-bold w-[30px] h-[30px] md:w-[48px] md:h-[48px] border border-[#B9C0CC] rounded cursor-pointer ${
                value == page
                    ? "text-white bg-[#5B2BAE] hover:bg-[#5B2BAE]/95 "
                    : "text-gray-footer bg-white hover:bg-white/75"
            }`}
            onClick={onClick}
        >
            {value}
        </li>
    );
};
