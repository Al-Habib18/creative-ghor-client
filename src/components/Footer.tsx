/** @format */

import Link from "next/link";

function Footer() {
    return (
        <footer
            className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 transition-colors duration-300"
            aria-label="Site Footer"
        >
            <div className=" py-4 px-4 md:px-8 sm:px-6 lg:px-8">
                <div className=" max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                        &copy; 2025{" "}
                        <span className="font-semibold">Creative Ghor</span>.
                        All rights reserved.
                    </p>

                    <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                        {[
                            { name: "About", path: "/about" },
                            { name: "Privacy Policy", path: "/privacy-policy" },
                            { name: "Licensing", path: "/licensing" },
                            { name: "Contact", path: "/contact" },
                        ].map(({ name, path }) => (
                            <Link
                                key={name}
                                href={path}
                                scroll={false}
                                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                            >
                                {name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
