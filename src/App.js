import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <main className="">
                <Routes>
                    <Route path="/" element={<Login />} />
                    {/* <Route
                        path="/"
                        element={
                            !isLoggedIn ? (
                                <Login login={() => setIsLoggedIn(true)} />
                            ) : (
                                <Home logout={() => setIsLoggedIn(false)} />
                            )
                        }
                    /> */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
