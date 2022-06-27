import React from "react";
import { getMaxInputLength } from "../../utils/helpers";

export default function ListingInput({
    name,
    type,
    placeholder,
    value,
    setValue,
    lastchild,
}) {
    const maxLength = React.useMemo(() => getMaxInputLength(name), [name]);
    return (
        <div className={`input-control  ${!lastchild && "mb-[18px]"}`}>
            <label className="capitalize text-gray-700 mb-3" htmlFor={name}>
                {name}
            </label>
            <input
                className="listing-input"
                type={type}
                id={name}
                name={name}
                maxLength={maxLength}
                value={value}
                placeholder={placeholder || `Your ${name}`}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

ListingInput.defaultProps = {
    name: "input",
    type: "text",
};
