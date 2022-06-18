import React from "react";
import { ReactComponent as ArrowSvg } from "../../assets/images/icon_back.svg";

export default function BackArrow({ width }) {
    return (
        <div className={`${width}`}>
            <ArrowSvg />
        </div>
    );
}
