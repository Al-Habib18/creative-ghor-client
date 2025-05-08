/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import {
    LayoutDashboard,
    Package,
    User,
    MapPin,
    Settings,
    Menu,
    X,
} from "lucide-react";

const links = [
    { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },

    { href: "/user/profile", label: "Profile", icon: User },
    { href: "/user/settings", label: "Settings", icon: Settings },
    { href: "/user/orders", label: "Orders", icon: Package },
    { href: "/user/addresses", label: "Shipping Address", icon: MapPin },
];

export default function DashboardSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-18 left-4 z-50 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md shadow"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed z-40 top-0 left-0 min-h-screen h-full w-64 bg-zinc-100 dark:bg-zinc-900 border-r dark:border-zinc-800 p-6 transform transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0 md:static md:block"
                )}
            >
                <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-8">
                    User Panel
                </h2>
                {/* TODO: this div will be hidden on when side bar is closed */}
                <div className={`md:hidden w-full h-10`} />
                <nav className="space-y-1">
                    {links.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 rounded-md transition-colors font-medium",
                                    "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                                    isActive &&
                                        "bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white"
                                )}
                                onClick={() => setIsOpen(false)} // close drawer on mobile after click
                            >
                                <Icon className="w-5 h-5" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
