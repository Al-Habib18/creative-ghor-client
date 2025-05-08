/** @format */

import React from "react";
import SharedNotificationSetting from "@/components/SharedNotificationSetting";

const UserSettings = () => {
    return (
        <div className="min-h-screen mx-auto w-3/5">
            <SharedNotificationSetting
                title="User Settings"
                subtitle="Manage your user settings"
            />
        </div>
    );
};

export default UserSettings;
