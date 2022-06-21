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
                <Route
                    path="dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="listings" element={<Listings />} />
                    <Route
                        path="listings/:category/:id"
                        element={<SingleListing />}
                    />
                </Route>
                <Route path="terms-of-service" element={<TermsOfService />} />

                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
