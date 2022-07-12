import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Select } from "../../components";
import { useUserContext } from "../../context/UserContext";
import { CITY_OPTIONS } from "../../data/variables";
import { AccountInput } from "../../components/inputs";

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
            <form className="px-20 lg:px-[138px] pt-14 pb-24 2xl:grid grid-cols-2 gap-40">
                <div className="max-w-input mx-auto 2xl:max-w-none 2xl:mx-0">
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
                <div className="flex flex-col max-w-input mx-auto pt-14 2xl:pt-0 2xl:max-w-none 2xl:mx-0">
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
                    <Button
                        color="gold"
                        margins="mt-14 2xl:mt-auto"
                        width="max-w-input"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
}
