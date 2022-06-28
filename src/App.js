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

import {
    Checkout,
    CreateListing,
    Dashboard,
    ErrorPage,
    Home,
    Listings,
    LoadingPage,
    Login,
    Pickup,
    PrivacyPolicy,
    SingleListing,
    TermsOfService,
} from "./views";

function App() {
    return (
        <Router>
            <Routes>
                {/* Login Portal */}
                <Route path="/" element={<Login />}>
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
                    <Route
                        path="listings/:category/:id/checkout"
                        element={<Checkout />}
                    />
                    <Route
                        path="listings/:category/:id/checkout/pickup"
                        element={<Pickup />}
                    />
                    <Route path="deals" element={<Listings deals />} />
                    <Route path="deals/:id" element={<SingleListing />} />
                    <Route path="deals/:id/checkout" element={<Checkout />} />
                    <Route
                        path="deals/:id/checkout/pickup"
                        element={<Pickup />}
                    />
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
