import React from "react";
import { ReactComponent as LogoSvg } from "../../assets/images/logo.svg";

export default function Logo({ width, fill }) {
    return (
        <div className={`${width}`}>
            <LogoSvg className={`${fill}`} />
        </div>
    );
}
