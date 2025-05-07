/** @format */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { LayoutDashboard, Package, ShoppingCart, User } from "lucide-react"; // You can replace or customize these icons

const links = [
    {
        href: "/admin/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard size={18} />,
    },
    {
        href: "/admin/products",
        label: "Products",
        icon: <Package size={18} />,
    },
    {
        href: "/admin/orders",
        label: "Orders",
        icon: <ShoppingCart size={18} />,
    },
    { href: "/admin/profile", label: "Profile", icon: <User size={18} /> },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 min-h-screen border-r bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 p-6">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-8">
                Admin Panel
            </h2>
            <nav className="space-y-1">
                {links.map(({ href, label, icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                                isActive &&
                                    "bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white"
                            )}
                        >
                            {icon}
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
