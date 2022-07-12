import React from "react";
import { getMaxInputLength } from "../../utils/helpers";

export default function AccountInput({
    name,
    type,
    value,
    setValue,
    disabled,
}) {
    const maxLength = React.useMemo(() => getMaxInputLength(name), [name]);
    return (
        <div className="input-control mb-[15px] last:mb-0">
            <label className="capitalize mb-3 text-gray-400" htmlFor={name}>
                {name}
            </label>
            <input
                className="base-input px-6 py-5 text-gray-500 font-semibold text-base disabled:bg-white"
                type={type}
                id={name}
                name={name}
                maxLength={maxLength}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
}

AccountInput.defaultProps = {
    type: "text",
};
