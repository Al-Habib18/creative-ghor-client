/** @format */
"use client";

import ProductCard from "@/components/ProductCard";
import { useTheme } from "next-themes";
import { useGetAllProductsQuery } from "@/state/productApi";

export default function Home() {
    const { resolvedTheme } = useTheme();
    const { data: products, isLoading } = useGetAllProductsQuery({});

    if (isLoading) return <p>Loading...</p>;

    if (!products || products.length === 0)
        return (
            <p className="text-center mt-10  min-h-screen text-3xl">
                No products found
            </p>
        );

    console.log("products:-", products);

    return (
        <div
            className={`py-8 min-h-screen transition-colors duration-300 ${
                resolvedTheme === "dark"
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-black"
            }`}
        >
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-2xl font-bold mb-6">All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
