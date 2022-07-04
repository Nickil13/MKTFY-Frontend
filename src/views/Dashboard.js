import React from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { BreadCrumbs } from "../components";
import { Navbar, Footer } from "../components/layout";
import { generateCrumbs } from "../utils/helpers";
import { useModalContext } from "../context/ModalContext";
import { UploadImageModal } from "../components/modals";
import Alert from "../components/Alert";

export default function Dashboard() {
    const { showModal, showAlert, alertType, confirmAlert, cancelAlert } =
        useModalContext();
    let location = useLocation();
    let [searchParams] = useSearchParams();
    let crumbs = generateCrumbs(location, searchParams);

    return (
        <div className="relative min-h-screen pb-footer">
            <Navbar />
            <main className="relative bg-gray-cloud-gray min-h-screen pt-nav">
                <div className="min-h-screen bg-gray-clouds bg-cover bg-fixed bg-center bg-no-repeat pt-8 pb-32 px-10 2xl:px-[142px]">
                    <BreadCrumbs crumbs={crumbs} />
                    <Outlet />
                </div>
            </main>
            <Footer />
            {/* Upload Image Modal */}
            {showModal && (
                <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 h-screen z-[70]">
                    <UploadImageModal
                    // handleUploadImage={handleUploadImage}
                    />
                </div>
            )}
            {showAlert && (
                <div className="fixed flex items-center justify-center inset-0 bg-black bg-opacity-50 h-screen z-[70]">
                    <Alert
                        alertType={alertType}
                        onCancel={cancelAlert}
                        onConfirm={confirmAlert}
                    />
                </div>
            )}
        </div>
    );
}
