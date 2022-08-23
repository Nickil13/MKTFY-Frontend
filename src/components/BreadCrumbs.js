import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CrumbArrow } from "../assets/images/Icon_nav_forward.svg";

export default function BreadCrumbs({ crumbs }) {
    if (!crumbs || crumbs.length <= 1) {
        return null;
    }

    return (
        <ul className="flex flex-wrap mb-10">
            {crumbs.map(({ name, path }, index) => {
                const isLastCrumb = index + 1 === crumbs.length;
                return (
                    <li
                        key={index}
                        className={`flex items-center capitalize text-xs ${
                            !isLastCrumb ? "mr-1" : "font-bold"
                        }`}
                    >
                        {!isLastCrumb ? (
                            <>
                                <Link to={path}>{name}</Link>
                                <CrumbArrow className="mx-[5px] fill-purple-100" />
                            </>
                        ) : (
                            <span>{name}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
