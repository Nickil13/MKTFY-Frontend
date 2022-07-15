import React, { useState, useMemo } from "react";
import { Button } from "../../components";
import { PasswordInput } from "../../components/inputs";
import { PasswordRequirement } from "../../components/modals";
import { checkUppercase, checkContainsNumber } from "../../utils/helpers";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordsMatching, setPasswordsMatching] = useState(true);
    const correctLength = newPassword.length > 5;
    const hasUppercase = useMemo(
        () => checkUppercase(newPassword),
        [newPassword]
    );
    const hasNumber = checkContainsNumber(newPassword);
    const criteriaMet = correctLength && hasUppercase && hasNumber;
    const passwordStrength = criteriaMet ? "strong" : "weak";

    const checkPasswordsMatching = () => {
        if (newPassword == confirmNewPassword) {
            setPasswordsMatching(true);
        } else {
            setPasswordsMatching(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Changing password");
    };
    return (
        <div className="bg-white p-8 pr-24 rounded-[10px] shadow-modal max-w-[657px]">
            <h1 className="text-purple-100 font-bold mb-7">Change Password</h1>
            <form onSubmit={onSubmit}>
                <PasswordInput
                    name="current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <p className="mt-7 mb-4 text-gray-footer font-semibold text-base">
                    The password must have at least 6 characters and must
                    contain 1 uppercase and 1 number.
                </p>
                <div className="relative">
                    <PasswordInput
                        name="new password"
                        password={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={checkPasswordsMatching}
                    />
                    {newPassword && (
                        <span
                            className={`absolute top-1 left-32 ${
                                passwordStrength === "weak"
                                    ? "text-gold-200"
                                    : "text-green"
                            } font-semibold text-2xs capitalize`}
                        >
                            {passwordStrength}
                        </span>
                    )}
                </div>

                <PasswordInput
                    name="confirm password"
                    password={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    onBlur={checkPasswordsMatching}
                    invalid={!passwordsMatching}
                    errorMessage
                />
                <div className="mt-5">
                    <PasswordRequirement requirement={correctLength}>
                        At least 6 characters
                    </PasswordRequirement>
                    <PasswordRequirement requirement={hasUppercase}>
                        1 Uppercase
                    </PasswordRequirement>
                    <PasswordRequirement requirement={hasNumber}>
                        1 Number
                    </PasswordRequirement>
                </div>
                <Button
                    type="submit"
                    margins="mt-15"
                    maxWidth="max-w-input"
                    disabled={!criteriaMet || !passwordsMatching}
                >
                    Set Password
                </Button>
            </form>
        </div>
    );
}
