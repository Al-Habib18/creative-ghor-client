/** @format */

import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" h-screen w-full bg-gray-950">
            <main className=" w-full flex h-full justify-center items-center">
                {children}
            </main>
        </div>
    );
};

export default layout;
