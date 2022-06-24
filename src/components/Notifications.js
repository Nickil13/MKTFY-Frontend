import React, { useState } from "react";
import AlertBell from "../assets/images/Group 1553.svg";
import Dropdown from "./Dropdown";

function NotificationItem({ children, date, bg }) {
    return (
        <div
            className={`flex items-center h-[96px] ${bg} px-4  shadow-[0px_2px_0px_#00000015]`}
        >
            <div className="bg-purple-500 text-white font-bold text-xs mr-4 rounded-full px-1.5 py-5">
                MKTFY
            </div>
            <div>
                <h3 className="text-xs">{children}</h3>
                <span className="text-2xs font-light">{date}</span>
            </div>
        </div>
    );
}
export default function Notifications() {
    const [notificationsShowing, setNotificationsShowing] = useState(false);

    const showNotifications = () => {
        setNotificationsShowing(true);
    };
    return (
        <div className="relative flex items-center">
            {/* Notification Dropdown */}
            <Dropdown
                width="w-[375px]"
                pos="top-16 right-[42px]"
                showing={notificationsShowing}
                setShowing={setNotificationsShowing}
                arrowRight
            >
                <div>
                    <h2 className="text-xs font-bold pt-5 pb-7 px-4">
                        News for you
                    </h2>
                    <div>
                        <NotificationItem
                            bg="bg-beige-200"
                            date="September 07, 2020"
                        >
                            Hey Mark, welcome to MKTFY
                        </NotificationItem>
                    </div>
                </div>
                <div className="mb-12">
                    <h2 className="text-xs font-bold pt-9 pb-6 px-4">
                        Previously Seen
                    </h2>
                    <div>
                        <NotificationItem date="September 05, 2020">
                            Let's create your first offer!
                        </NotificationItem>
                        <NotificationItem date="September 03 2020">
                            Our Terms of Service has been updated!
                        </NotificationItem>
                    </div>
                </div>
            </Dropdown>

            {/* Bell button */}
            <button onClick={showNotifications}>
                <img
                    className="w-[24px] mr-[71px]"
                    src={AlertBell}
                    alt="Alert bell icon"
                />
            </button>
        </div>
    );
}
