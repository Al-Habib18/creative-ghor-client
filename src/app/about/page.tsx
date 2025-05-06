/** @format */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-16 transition-colors duration-300">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white">
                        About Us
                    </h1>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        We are a team dedicated to redefining your online
                        shopping journey — from quality products to fast
                        delivery.
                    </p>
                </motion.div>

                {/* Info Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            title: "Our Mission",
                            description:
                                "Deliver top-quality products with unbeatable value, wrapped in a seamless shopping experience.",
                        },
                        {
                            title: "Our Vision",
                            description:
                                "To become your favorite online store — trusted, tailored, and always customer-first.",
                        },
                        {
                            title: "Why Choose Us?",
                            description:
                                "We combine experience, care, and tech to offer secure shopping, fast delivery, and top-tier service.",
                        },
                    ].map((card, index) => (
                        <div
                            key={index}
                            className="text-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                                {card.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Have questions?{" "}
                        <Link
                            href="/contact"
                            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                            Contact our team
                        </Link>
                        — we are here to help.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
