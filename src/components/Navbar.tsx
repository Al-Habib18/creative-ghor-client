/** @format */

"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/state/redux";
import { toggleTheme } from "@/state/globalSlice";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Navbar() {
    const theme = useAppSelector((state) => state.global.theme);
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const cartItemCount = useAppSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <header className="shadow-sm bg-white dark:bg-zinc-900 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-6 sm:px-6  md:px-6  lg:px-0 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-primary">
                    Creative<span className="text-emerald-500">Shop</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6 justify-center items-center">
                    <div>
                        {/* TODO: Add search functionality */}
                        <input
                            type="text"
                            className="bg-white ml-2 rounded-md text-black px-2 py-1"
                        />
                    </div>
                    <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary transition"
                    >
                        Home
                    </Link>
                    <Link
                        href="/shop"
                        className="text-sm font-medium hover:text-primary transition"
                    >
                        Shop
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium hover:text-primary transition"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium hover:text-primary transition"
                    >
                        Contact
                    </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 pl-2  ">
                    {/* Theme Toggle */}
                    <button onClick={() => dispatch(toggleTheme())}>
                        {theme === "dark" ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>

                    {/* User / Login */}
                    {/* SIGN IN  BUTTON */}
                    <SignedIn>
                        {/* Cart */}
                        <Link href="/cart" className="relative">
                            <ShoppingCart size={22} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItemCount}
                            </span>
                        </Link>
                        <UserButton
                            appearance={{
                                baseTheme: dark,
                                elements: {
                                    rootBox:
                                        "flex justify-center items-center py-5",
                                    cardBox: "shadow-none",
                                    card: "bg-customgreys-primarybg",
                                    footer: {
                                        background: "#2562F",
                                        padding: "0rem 2.5rem",
                                    },
                                    formFieldLabel:
                                        "text-white-50 font-semibold",
                                    userButtonOuterIdentifier: "font-semibold",
                                    userButtonBox: "scale-90 sm:scale-100",
                                },
                            }}
                            showName={true}
                            userProfileMode="navigation"
                            userProfileUrl={"/profile"}
                        />
                    </SignedIn>
                    <SignedOut>
                        <Link
                            scroll={false}
                            href="/sign-up"
                            className="bg-gray-600 hover:bg-gray-500 duration-300 hover:text-white-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md  text-sm sm:text-base;
"
                        >
                            Register
                        </Link>
                        <Link
                            href="/sign-in"
                            className="bg-blue-700 hover:bg-blue-600 duration-300  text-white hover:text-white-50 px-3 sm:px-2 py-1 sm:py-2 rounded-md  text-sm sm:text-base;
"
                        >
                            Login
                        </Link>
                    </SignedOut>
                </div>
            </nav>
        </header>
    );
}
