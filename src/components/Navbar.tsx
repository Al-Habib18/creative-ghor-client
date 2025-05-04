/** @format */

"use client";

import Link from "next/link";
import { useAppSelector } from "@/state/redux";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const cartItemCount = useAppSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    const [mounted, setMounted] = useState(false);

    // Set mounted to true after the initial render to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Prevent render until the client-side is ready
    }

    return (
        <header className="bg-white dark:bg-zinc-900 shadow-sm sticky top-0 z-50 border-b-1 border-gray-700">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-zinc-900 dark:text-white"
                >
                    Creative<span className="text-emerald-500">Shop</span>
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center space-x-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-1 rounded-md text-sm bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white focus:outline-none"
                    />
                    {["Home", "Shop", "About", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-emerald-500 transition"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-4">
                    {/* Theme toggle */}
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

                    {/* Cart */}
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

                    {/* User/Login */}
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
                            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-sm transition"
                        >
                            Register
                        </Link>
                        <Link
                            href="/sign-in"
                            className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                        >
                            Login
                        </Link>
                    </SignedOut>
                </div>
            </nav>
        </header>
    );
}
