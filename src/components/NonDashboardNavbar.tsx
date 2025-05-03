/** @format */
"use client";
import React from "react";
import Link from "next/link";
import { Bell, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function NonDaashboard() {
    const { user } = useUser();
    const userRole = user?.publicMetadata.userType as "student" | "teacher";
    return (
        <nav className="w-full border-b-1 border-gray-800 flex justify-center bg-customgreys-primarybg">
            <div className="flex justify-between items-center w-3/4 py-2">
                <div className="flex justify-between items-center gap-14">
                    <Link
                        scroll={false}
                        href="/"
                        className="font-bold text-lg sm:text-xl hover:text-customgreys-dirtyGrey"
                    >
                        skill-nest
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="relative group pl-10 sm:pl-14 pr-6 sm:pr-20 py-3 sm:py-4 rounded-xl text-customgreys-dirtyGrey hover:text-white-50  transition-all duration-300 text-sm sm:text-base bg-gray-800 hover:bg-gray-700">
                            <Link scroll={false} href="/search" className=" ">
                                <span className="hidden sm:inline  ">
                                    Search Courses
                                </span>
                                <span className="sm:hidden ">Search</span>
                            </Link>
                            <BookOpen className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-customgreys-dirtyGrey transition-all duration-300" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="relative w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="absolute top-0 right-0 bg-blue-500 h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full"></span>
                        <Bell className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    {/* SIGN IN  BUTTON */}
                    <SignedIn>
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
                            userProfileUrl={
                                userRole === "teacher"
                                    ? "/teacher/profile"
                                    : "/user/profile"
                            }
                        />
                    </SignedIn>
                    <SignedOut>
                        <Link
                            scroll={false}
                            href="/sign-up"
                            className="bg-gray-600 hover:bg-gray-500 duration-300 hover:text-white-50 font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md  text-sm sm:text-base;
"
                        >
                            Register
                        </Link>
                        <Link
                            href="/sign-in"
                            className="bg-blue-700 hover:bg-blue-600 duration-300 font-semibold text-white hover:text-white-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md  text-sm sm:text-base;
"
                        >
                            Login
                        </Link>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}
