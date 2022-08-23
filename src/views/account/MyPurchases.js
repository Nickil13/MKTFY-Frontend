import React from "react";
import { PurchasesCard } from "../../components/cards";
import { useNavigate } from "react-router-dom";
import { useListingContext } from "../../context/ListingContext";

export default function MyPurchases() {
    const {
        myPurchases: purchases,
        getMyPurchases,
        setCurrentListing,
    } = useListingContext();
    let navigate = useNavigate();

    React.useEffect(() => {
        if (purchases.length === 0) {
            getMyPurchases();
        }
    }, []);

    const onCardClick = (purchase) => {
        setCurrentListing(purchase);
        navigate(`${purchase.id}/pickup-information`);
    };
    return (
        <div>
            <h1 className="text-gray-500 font-bold mb-4">My Purchases</h1>
            <span className="inline-block text-gray-500 text-sm-16 mb-7">
                {`${purchases.length} item${purchases.length > 1 ? "s" : ""}`}
            </span>
            {/* Purchases Cards */}
            <div className="flex flex-col gap-5 lg:gap-2">
                {purchases.length > 0 ? (
                    purchases.map((purchase, index) => {
                        return (
                            <PurchasesCard
                                key={index}
                                {...purchase}
                                onClick={() => onCardClick(purchase)}
                            />
                        );
                    })
                ) : (
                    <p>You have not made any purchases.</p>
                )}
            </div>
        </div>
    );
}
