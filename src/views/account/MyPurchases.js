import React, { useState } from "react";
import { PurchasesCard } from "../../components/cards";
import { useNavigate } from "react-router-dom";
import { getMyPurchases } from "../../actions/user";

export default function MyPurchases() {
    const [purchases, setPurchases] = useState([]);
    let navigate = useNavigate();

    React.useEffect(() => {
        if (purchases.length === 0) {
            getMyPurchases().then((purchases) => {
                setPurchases(purchases);
            });
        }
    }, []);

    const onCardClick = (purchaseName, id, category) => {
        navigate(`${id}/pickup-information`, {
            state: { name: purchaseName, category },
        });
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
                                onClick={() =>
                                    onCardClick(
                                        purchase.prodName,
                                        purchase.id,
                                        purchase.category
                                    )
                                }
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
