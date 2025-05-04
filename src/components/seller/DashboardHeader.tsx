/** @format */

"use client";

import { UserButton } from "@clerk/nextjs";
function DashboardHeader() {
    return (
        <header className="w-full px-6 py-4 bg-white dark:bg-zinc-800 flex items-center justify-between shadow-sm">
            <h1 className="text-lg font-semibold">Seller Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
        </header>
    );
}

export default DashboardHeader;
