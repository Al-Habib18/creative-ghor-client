/** @format */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 py-12">
            <div className="container mx-auto max-w-7xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                        About Us
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
                        We are a passionate team dedicated to providing you with
                        the best online shopping experience. From high-quality
                        products to fast delivery, we strive to meet your needs
                        and exceed your expectations.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                >
                    <div className="text-center bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                            Our Mission
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            To bring you the best products at competitive prices
                            while providing a seamless shopping experience.
                        </p>
                    </div>

                    <div className="text-center bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                            Our Vision
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            To be the go-to online store for quality products,
                            excellent customer service, and a personalized
                            shopping experience.
                        </p>
                    </div>

                    <div className="text-center bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                            Why Choose Us?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            With years of experience, we offer an extensive
                            catalog of high-quality products, secure shopping,
                            and reliable delivery.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 dark:text-gray-400">
                        Want to learn more? Feel free to{" "}
                        <Link
                            href="/contact"
                            className="text-emerald-500 hover:underline"
                        >
                            reach out to us
                        </Link>
                        .
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
