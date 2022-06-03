import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            !isLoggedIn ? (
                                <Login login={() => setIsLoggedIn(true)} />
                            ) : (
                                <Home logout={() => setIsLoggedIn(false)} />
                            )
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
