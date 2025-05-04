/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/products", label: "Products" },
    { href: "/dashboard/orders", label: "Orders" },
    { href: "/dashboard/profile", label: "Profile" },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen border-r bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
                Seller Panel
            </h2>
            <nav className="space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "block px-4 py-2 rounded-md transition-colors font-medium",
                                "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                                isActive &&
                                    "bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white"
                            )}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
