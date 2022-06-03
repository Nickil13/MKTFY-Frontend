import React from "react";

export default function Layout(props) {
    console.log("render Layout");
    return (
        <div className="container">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <div className="content">{props.children}</div>
        </div>
    );
}
