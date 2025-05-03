/** @format */

import Link from "next/link";
import React from "react";

function Footer() {
    return (
        <div className="shadow-sm bg-white dark:bg-zinc-900 sticky top-0 p-2 z-50">
            <div className=" flex flex-grid gap-10 justify-center items-center max-w-screen-2xl w-auto">
                <p>&copy; 2025 Creative Ghor, All Rights Reserved</p>
                <div className="flex flex-grid gap-4 underline">
                    {["About", "Privace Policy", "Licensing", "Contact"].map(
                        (item) => (
                            <Link
                                scroll={false}
                                key={item}
                                href={`/${item
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                                className="text-gray-300 duration-200 hover:text-gray-50"
                            >
                                {item}
                            </Link>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Footer;
