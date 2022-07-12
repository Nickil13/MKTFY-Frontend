import React from "react";
import { useEffect } from "react";
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

import {
    AccountInformation,
    ActiveItems,
    MyListings,
    MyPurchases,
    SoldItems,
} from "./views/account";
import ViewMyListing from "./views/account/ViewMyListing";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    {/* Login Portal */}
                    <Route path="/" element={<Login />}>
                        <Route path="login" element={<LoginModal />} />
                        <Route path="register" element={<RegisterModal />} />
                        <Route
                            path="forgot-password"
                            element={<ForgotPasswordModal />}
                        />
                        <Route
                            path="verify-reset"
                            element={<VerifyResetModal />}
                        />
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
                            path="listings/:category"
                            element={<Listings />}
                        />
                        <Route
                            path="listings/:category/:id"
                            element={<SingleListing />}
                        />
                        <Route
                            path="listings/:category/:id/checkout"
                            element={<Checkout />}
                        />
                        <Route
                            path="listings/:category/:id/checkout/pickup-information"
                            element={<Pickup />}
                        />

                        {/* Create Listing */}
                        <Route
                            path="create-listing"
                            element={<CreateListing />}
                        />

                        {/* Account */}
                        <Route path="account">
                            <Route index element={<AccountInformation />} />
                            <Route
                                path="info"
                                element={<AccountInformation />}
                            />
                            <Route
                                path="my-purchases"
                                element={<MyPurchases />}
                            />
                            <Route
                                path="my-purchases/:id/pickup-information"
                                element={<Pickup />}
                            />
                            <Route path="my-listings" element={<MyListings />}>
                                <Route index element={<ActiveItems />} />
                                <Route path="sold" element={<SoldItems />} />
                            </Route>
                            <Route
                                path="my-listings/:id"
                                element={<ViewMyListing />}
                            />
                        </Route>
                    </Route>

                    {/* ToS and PP Pages */}
                    <Route
                        path="terms-of-service"
                        element={<TermsOfService />}
                    />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />

                    {/* 404 Error Page */}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </ScrollToTop>
        </Router>
    );
}

export default App;
