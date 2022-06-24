import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    CreatePasswordModal,
    ForgotPasswordModal,
    LoginModal,
    RegisterModal,
    ResetPasswordModal,
    VerifyResetModal,
} from "./components/modals";

import RequireAuth from "./utils/RequireAuth";
import { ModalContextProvider } from "./context/ModalContext";
import {
    CreateListing,
    Dashboard,
    ErrorPage,
    Home,
    Listings,
    LoadingPage,
    Login,
    PrivacyPolicy,
    SingleListing,
    TermsOfService,
} from "./views";

function App() {
    return (
        <Router>
            <Routes>
                {/* Login Portal */}
                <Route
                    path="/"
                    element={
                        <ModalContextProvider>
                            <Login />
                        </ModalContextProvider>
                    }
                >
                    <Route path="login" element={<LoginModal />} />
                    <Route path="register" element={<RegisterModal />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPasswordModal />}
                    />
                    <Route path="verify-reset" element={<VerifyResetModal />} />
                    <Route
                        path="reset-password"
                        element={<ResetPasswordModal />}
                    />
                    <Route
                        path="create-password"
                        element={<CreatePasswordModal />}
                    />
                </Route>
                <Route path="loading" element={<LoadingPage />} />

                {/* The Dashboard */}
                <Route
                    path="dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                >
                    <Route index element={<Home />} />

                    {/* Listings & Deals */}
                    <Route path="listings" element={<Listings />} />
                    <Route
                        path="listings/:category/:id"
                        element={<SingleListing />}
                    />
                    <Route path="deals" element={<Listings deals />} />
                    <Route path="deals/:id" element={<SingleListing />} />

                    {/* Create Listing */}
                    <Route path="create-listing" element={<CreateListing />} />
                </Route>

                {/* ToS and PP Pages */}
                <Route path="terms-of-service" element={<TermsOfService />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />

                {/* 404 Error Page */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
