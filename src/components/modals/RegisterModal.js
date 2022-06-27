import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Input from "../Input";
import Select from "../Select";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { CITY_OPTIONS } from "../../data/variables";
import { LoginInput } from "../inputs";

export default function RegisterModal() {
    const [firstName, setFirstName] = useState("Nicki");
    const [lastName, setLastName] = useState("L");
    const [email, setEmail] = useState("nickitest@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("14031234567");
    const [address, setAddress] = useState("123 street");
    const [city, setCity] = useState("Calgary");
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
            padding="pt-4 pl-28"
            portalModal
        >
            <h1 className="text-purple-200 font-bold mb-3">
                Welcome to MKTFY!
            </h1>
            <p className="modal-text mb-6 pr-32">
                It's nice to meet you. At MKTFY you are able to buy, sell and
                donate awesome stuff to a community of awesome people. Please
                fill out the form below to get started.
            </p>
            <div className="bg-beige-200 p-8 pr-32 rounded-tl-3xl">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-x-5 "
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
                            width="1/2"
                            preselected
                        ></Select>
                        <Button
                            type="submit"
                            color="gold"
                            margins="mt-48"
                            centered
                            disabled={notAllFieldsFilled}
                        >
                            Next
                        </Button>
                    </div>
                </form>
                <p className="text-sm-17 text-gray-300">
                    At MKTFY we respect your privacy and do not tolerate spam,
                    and will never sell, rent, lease or give away your
                    information. We only buy, sell or donate your stuff here at
                    MKTFY.
                </p>
            </div>
        </ModalWrapper>
    );
}
