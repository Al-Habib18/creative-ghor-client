/** @format */

"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useTheme } from "next-themes";
import { useGetAllProductsQuery } from "@/state/productApi";
import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { motion } from "framer-motion";
import { CategoryEnum } from "@/types";

const categories: CategoryEnum[] = [
    CategoryEnum.ELECTRONICS,
    CategoryEnum.FASHION,
    CategoryEnum.GROCERY,
    CategoryEnum.BOOKS,
    CategoryEnum.HOME,
    CategoryEnum.TOYS,
];

export default function ShopPage() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const [category, setCategory] = useState<CategoryEnum | undefined>();
    const [page, setPage] = useState<number>(1);
    const [sortType, setSortType] = useState<string>("");

    const {
        data: products,
        isLoading,
        isError,
        refetch,
    } = useGetAllProductsQuery(
        { category, page, sortType },
        { refetchOnMountOrArgChange: true }
    );
    // Automatically refetch on state change
    useEffect(() => {
        refetch();
    }, [category, page, sortType, refetch]);

    return (
        <div
            className={cn(
                "min-h-screen py-12 transition-colors duration-300",
                isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            )}
        >
            <div className="container mx-auto max-w-7xl px-4">
                {/* Heading */}
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

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="sticky top-16 z-10 bg-inherit backdrop-blur-sm py-2 mb-6 flex flex-wrap justify-center gap-3 border-b border-zinc-200 dark:border-zinc-700"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setCategory(cat);
                                setPage(1);
                            }}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all border dark:border-zinc-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500",
                                category === cat && "bg-blue-600 text-white"
                            )}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {/* Sort & Pagination */}
                <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                    <select
                        className="px-3 py-2 rounded border text-sm transition-colors  text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        onChange={(e) => setSortType(e.target.value)}
                        value={sortType}
                    >
                        <option value="">Sort By</option>
                        <option value={"asc"}>Price: Low to High</option>
                        <option value={"desc"}>Price: High to Low</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                            className="px-4 py-2 border rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        >
                            Prev
                        </button>
                        <span className="px-2 py-2">{page}</span>
                        <button
                            onClick={() => setPage((prev) => prev + 1)}
                            className="px-4 py-2 border rounded hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <Loading message="Loading products..." />
                ) : isError || !products || products.length === 0 ? (
                    <ErrorMessage
                        message="No products found."
                        showHomeLink={false}
                    />
                ) : (
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
                )}
            </div>
        </div>
    );
}
