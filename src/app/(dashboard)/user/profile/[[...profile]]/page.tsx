/** @format */

import React from "react";
import Header from "@/components/Header";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const UserProfilePage = () => {
    return (
        <div>
            <Header title="Profile" subtitle="View your profile" />
            <UserProfile
                path="/user/profile"
                routing="path"
                appearance={{
                    baseTheme: dark,
                    elements: {
                        scrollBox: "bg-gray-800",
                        navbar: {
                            "& > div:nth-child(1)": {
                                background: "none",
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default UserProfilePage;
