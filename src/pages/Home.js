import React, { useState, useEffect } from "react";

import MyTable from "../components/MyTable";
import Layout from "../components/Layout";

export default function Home({ logout }) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=20")
            .then((res) => res.json())
            .then((json) => setTodos(json));
    }, []);

    return (
        <Layout title="Home" description="This is the home page.">
            <MyTable todos={todos} />
            <button className="btn" onClick={logout}>
                Logout
            </button>
        </Layout>
    );
}
