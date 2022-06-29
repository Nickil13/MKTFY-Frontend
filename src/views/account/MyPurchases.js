import React, { useState } from "react";
import { getMyPurchases } from "../../actions/purchases";
import { PurchasesCard } from "../../components/cards";
import { useNavigate } from "react-router-dom";

export default function MyPurchases() {
    const [purchases, setPurchases] = useState([]);
    let navigate = useNavigate();

    React.useEffect(() => {
        if (purchases.length < 1) {
            const data = getMyPurchases();
            setPurchases(data);
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
                2 items
            </span>
            {/* Purchases Cards */}
            <div className="flex flex-col gap-2">
                {purchases.length > 0 ? (
                    purchases.map((purchase, index) => {
                        return (
                            <PurchasesCard
                                key={index}
                                {...purchase}
                                onClick={() =>
                                    onCardClick(
                                        purchase.ProdName,
                                        purchase.Id,
                                        purchase.Category
                                    )
                                }
                            />
                        );
                    })
                ) : (
                    <div>You have not made any purchases.</div>
                )}
            </div>
        </div>
    );
}
