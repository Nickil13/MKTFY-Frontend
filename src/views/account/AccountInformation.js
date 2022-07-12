import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Select } from "../../components";
import { useUserContext } from "../../context/UserContext";
import { CITY_OPTIONS } from "../../data/variables";
import { getMaxInputLength } from "../../utils/helpers";

const AccountInput = ({ name, value, setValue, disabled }) => {
    const maxLength = React.useMemo(() => getMaxInputLength(name), [name]);
    return (
        <div className="input-control mb-[15px] last:mb-0">
            <label className="capitalize mb-3 text-gray-400" htmlFor={name}>
                {name}
            </label>
            <input
                className="base-input px-6 py-5 text-gray-500 font-semibold text-base disabled:bg-white"
                type="text"
                id={name}
                name={name}
                maxLength={maxLength}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
};
export default function AccountInformation() {
    const { user, getUserDetails } = useUserContext();
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");
    const [city, setCity] = useState(user?.city || "");

    useEffect(() => {
        if (!user) {
            getUserDetails();
        } else if (!email) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhoneNumber(user.phone);
            setAddress(user.address);
            setCity(user.city);
        }
    }, [user]);

    return (
        <div className="bg-white rounded-[10px] shadow-modal max-w-[1498px]">
            <form className="grid grid-cols-2 gap-40 px-[138px] pt-14 pb-24">
                <div>
                    <h2 className="text-base font-semibold mb-7">
                        Personal information
                    </h2>
                    <AccountInput
                        name="first name"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <AccountInput
                        name="last name"
                        value={lastName}
                        setValue={setLastName}
                    />
                    <AccountInput name="email" value={email} disabled />
                    <AccountInput
                        name="phone number"
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-base font-semibold mb-7">
                        Address Information
                    </h2>
                    <AccountInput
                        name="default pickup address"
                        value={address}
                        setValue={setAddress}
                    />

                    <Select
                        width="1/2"
                        name="city"
                        value={city}
                        setValue={setCity}
                        options={CITY_OPTIONS}
                        preselected
                    />
                    <Button color="gold" margins="mt-auto" width="max-w-input">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}
