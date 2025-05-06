/** @format */

"use client";

import Link from "next/link";
import { useAppSelector } from "@/state/redux";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = ["Home", "Products", "About", "Contact"];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const cartItemCount = useAppSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <header className="bg-white dark:bg-zinc-900 shadow-sm sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-700">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-zinc-900 dark:text-white"
                >
                    Creative<span className="text-emerald-500">Shop</span>
                </Link>

                {/* Nav Links + Search */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 py-2 rounded-md text-sm bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    {navLinks.map((item) => {
                        const path = `/${
                            item.toLowerCase() === "home"
                                ? ""
                                : item.toLowerCase()
                        }`;
                        const isActive = pathname === path;
                        return (
                            <Link
                                key={item}
                                href={path}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "text-white bg-emerald-600 dark:bg-emerald-500"
                                        : "text-zinc-700 dark:text-zinc-200 hover:text-emerald-500 dark:hover:text-emerald-400"
                                )}
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        aria-label="Toggle theme"
                        className="text-zinc-700 dark:text-zinc-200 hover:text-emerald-500 transition"
                    >
                        {theme === "dark" ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>

                    {/* Cart Icon */}
                    <Link
                        href="/cart"
                        className="relative text-zinc-700 dark:text-zinc-200 hover:text-emerald-500 transition"
                        aria-label="View cart"
                    >
                        <ShoppingCart size={22} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* User/Login Buttons */}
                    <SignedIn>
                        <UserButton
                            appearance={{
                                baseTheme: dark,
                                elements: {
                                    userButtonBox: "scale-90 sm:scale-100",
                                },
                            }}
                            showName={true}
                            userProfileMode="navigation"
                            userProfileUrl="/profile"
                        />
                    </SignedIn>

                    <SignedOut>
                        <Link
                            href="/sign-up"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm"
                        >
                            Register
                        </Link>
                        <Link
                            href="/sign-in"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm"
                        >
                            Login
                        </Link>
                    </SignedOut>
                </div>
            </nav>
        </header>
    );
}
