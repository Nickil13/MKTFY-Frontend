import React from "react";
import logo from "../assets/images/logo.svg";

export default function Login() {
    return (
        <div className="bg-login-clouds h-screen">
            <div className="flex flex-col justify-center  items-center w-full h-screen pt-24">
                <img className="w-64" src={logo} alt="mktfy logo" />
                <div className="flex flex-col mt-14">
                    <button className="btn bg-gold mb-4">Login</button>
                    <button className="btn bg-purple-500">
                        Create Account
                    </button>
                </div>
            </div>
            <div className="absolute left-20 bottom-10 text-sm-17">
                <p className="text-white">
                    Find out more about us!{" "}
                    <a href="#" className="text-gold font-bold">
                        Visit our website
                    </a>
                </p>
            </div>
        </div>
    );
}
