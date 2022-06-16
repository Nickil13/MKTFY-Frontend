import React, { useState } from "react";
import iconHide from "../../assets/images/icon_eye_hide.svg";
import ModalWrapper from "./ModalWrapper";
import Input from "../Input";

export default function RegisterModal() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    const notAllFieldsFilled =
        !firstName && !lastName && !email && !phoneNumber && !address && !city;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit and store user data
    };

    return (
        <ModalWrapper largeWrapper>
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
                        <Input
                            name="first name"
                            value={firstName}
                            setValue={setFirstName}
                            backgroundColor="bg-beige-100"
                        />
                        <Input
                            name="last name"
                            value={lastName}
                            setValue={setLastName}
                            backgroundColor="bg-beige-100"
                        />
                        <Input
                            name="email"
                            type={email}
                            value={email}
                            setValue={setEmail}
                            backgroundColor="bg-beige-100"
                        />
                        <Input
                            name="phone"
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            placeholder={"+1 (000) 000 - 0000"}
                            backgroundColor="bg-beige-100"
                        />
                    </div>
                    <div className="col-start-2">
                        <Input
                            name="street address"
                            value={address}
                            setValue={setAddress}
                            placeholder={"Default Pickup Address"}
                            backgroundColor="bg-beige-100"
                        />
                        <div className="input-control max-w-select">
                            <label htmlFor="city">City</label>
                            <select
                                name="city"
                                id="city"
                                className="bg-beige-100 "
                            >
                                <option
                                    value="default"
                                    className="text-gray-200"
                                >
                                    City name
                                </option>
                                <option value="Calgary">Calgary</option>
                                <option value="Brooks">Brooks</option>
                                <option value="Calgary">Calgary</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-gold btn mt-52"
                            disabled={notAllFieldsFilled}
                        >
                            Next
                        </button>
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
