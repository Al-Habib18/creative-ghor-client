/** @format */
"use client";

import ProductCard from "@/components/ProductCard";
import { useTheme } from "next-themes";
import { useGetAllProductsQuery } from "@/state/productApi";
import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
    "Electronics",
    "Fashion",
    "Grocery",
    "Books",
    "Home",
    "Toys",
];

export default function ShopPage() {
    const { resolvedTheme } = useTheme();
    const { data: products, isLoading, isError } = useGetAllProductsQuery({});
    const isDark = resolvedTheme === "dark";

    if (isLoading) return <Loading message="Loading products..." />;
    if (isError || !products || products.length === 0)
        return (
            <ErrorMessage message="No products found." showHomeLink={false} />
        );

    return (
        <div
            className={cn(
                "min-h-screen py-12 transition-colors duration-300",
                isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            )}
        >
            <div className="container mx-auto max-w-7xl px-4">
                {/* Page Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <h1 className="text-4xl font-bold mb-2">
                        Explore Our Products
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
                        Discover high-quality items from all categories —
                        hand-picked just for you.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="sticky top-16 z-10 bg-inherit backdrop-blur-sm py-2 mb-6 flex flex-wrap justify-center gap-3 border-b border-zinc-200 dark:border-zinc-700"
                >
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={`/products?category=${category.toLowerCase()}`}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all border dark:border-zinc-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500"
                        >
                            {category}
                        </Link>
                    ))}
                </motion.div>

                {/* Search */}
                <div className="mb-8 flex justify-end">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full sm:w-80 px-4 py-2 rounded-lg border dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Product Grid */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                delayChildren: 0.3,
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
