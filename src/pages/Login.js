import React from "react";

export default function Login({ login }) {
    return (
        <div className="container">
            <h1>Login </h1>
            <p>Click the button to log in!</p>
            <button className="btn" onClick={login}>
                Login
            </button>
        </div>
    );
}
