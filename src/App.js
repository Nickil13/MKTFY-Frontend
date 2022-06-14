import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalContextProvider } from "./context/ModalContext";
import Login from "./views/Login";

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <ModalContextProvider>
            <main className="">
                <Routes>
                    <Route path="/*" element={<Login />} />
                    <Route path="/dashboard" element={<div>Dashboard</div>} />
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
            </ModalContextProvider>
        </Router>
    );
}

export default App;
