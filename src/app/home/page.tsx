/** @format */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutGrid } from "lucide-react";

const categories = [
    "Electronics",
    "Fashion",
    "Grocery",
    "Books",
    "Home",
    "Toys",
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900">
            {/* Hero Section */}
            <section className="w-full h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800 border-b dark:border-zinc-700">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
                >
                    Your Marketplace for Everything
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-600 dark:text-gray-400 mt-4 max-w-xl text-lg"
                >
                    Shop top-quality products across electronics, fashion,
                    groceries, books, and more.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-8"
                >
                    <Link href="/products">
                        <Button className="text-white bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3 rounded-lg shadow">
                            Browse All Products{" "}
                            <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Categories Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
                        Shop by Category
                    </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                    {categories.map((cat) => (
                        <motion.div
                            key={cat}
                            whileHover={{ scale: 1.05 }}
                            className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-xl shadow p-5 text-center cursor-pointer border border-transparent hover:border-blue-500 transition"
                        >
                            <Link
                                href={`/products?category=${cat.toLowerCase()}`}
                                className="block space-y-2"
                            >
                                <LayoutGrid
                                    className="mx-auto text-blue-500"
                                    size={28}
                                />
                                <span className="font-semibold text-gray-800 dark:text-white text-sm">
                                    {cat}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 dark:bg-zinc-800 py-20 px-6">
                <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-3 text-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            🚚 Fast Delivery
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Orders delivered to your doorstep within 2–3
                            business days.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            💰 Best Prices
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Enjoy competitive prices and exclusive deals
                            year-round.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            🔒 Secure Checkout
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Safe and secure payment options for complete peace
                            of mind.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
