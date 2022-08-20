import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Select from "../Select";
import { useNavigate } from "react-router-dom";
import { CITY_OPTIONS } from "../../data/variables";
import { LoginInput } from "../inputs";

export default function RegisterModal() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    let navigate = useNavigate();

    const notAllFieldsFilled =
        !firstName || !lastName || !email || !phoneNumber || !address || !city;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit and pass user data
        const userInfo = {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
        };
        navigate("/create-password", { state: { userInfo } });
    };

    return (
        <ModalWrapper
            maxWidth="max-w-modal-lg"
            padding="pt-4 px-8 xlg:pl-28 xlg:pr-0"
            portalModal
        >
            <h1 className="text-purple-200 font-bold mb-3 mt-10 text-center xlg:text-start xlg:mt-0">
                Welcome to MKTFY!
            </h1>
            <p className="text-sm-17 lg:text-base font-semibold text-gray-300 mb-6 text-center xlg:pr-32 xlg:text-start">
                It's nice to meet you. At MKTFY you are able to buy, sell and
                donate awesome stuff to a community of awesome people. Please
                fill out the form below to get started.
            </p>
            <div className="bg-beige-200 p-8 xlg:pr-32 rounded-3xl mb-10 xlg:mb-0 xlg:rounded-none xlg:rounded-tl-3xl">
                <form
                    onSubmit={handleSubmit}
                    className="xlg:grid xlg:grid-cols-2 gap-x-5"
                >
                    <div className="col-start-1">
                        <LoginInput
                            name="first name"
                            value={firstName}
                            setValue={setFirstName}
                            backgroundColor="bg-beige-100"
                        />
                        <LoginInput
                            name="last name"
                            value={lastName}
                            setValue={setLastName}
                            backgroundColor="bg-beige-100"
                        />
                        <LoginInput
                            name="email"
                            type="email"
                            value={email}
                            setValue={setEmail}
                            backgroundColor="bg-beige-100"
                        />
                        <LoginInput
                            name="phone"
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            placeholder={"+1 (000) 000 - 0000"}
                            backgroundColor="bg-beige-100"
                        />
                    </div>
                    <div className="col-start-2">
                        <LoginInput
                            name="street address"
                            value={address}
                            setValue={setAddress}
                            placeholder={"Default Pickup Address"}
                            backgroundColor="bg-beige-100"
                        />
                        <Select
                            name="city"
                            bg="bg-beige-100"
                            setValue={setCity}
                            options={CITY_OPTIONS}
                            value={city}
                            className="w-full xlg:w-1/2 max-w-input"
                            preselected
                        ></Select>
                        <button
                            type="submit"
                            className="btn-gold-new mt-20 xlg:mt-48 mx-auto max-w-btn"
                            disabled={notAllFieldsFilled}
                        >
                            Next
                        </button>
                    </div>
                </form>
                <p className="text-sm-17 text-gray-300 mt-10 xlg:mt-0">
                    At MKTFY we respect your privacy and do not tolerate spam,
                    and will never sell, rent, lease or give away your
                    information. We only buy, sell or donate your stuff here at
                    MKTFY.
                </p>
            </div>
        </ModalWrapper>
    );
}
