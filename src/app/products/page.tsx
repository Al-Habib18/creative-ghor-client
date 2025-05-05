/** @format */
"use client";

import ProductCard from "@/components/ProductCard";
import { useTheme } from "next-themes";
import { useGetAllProductsQuery } from "@/state/productApi";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
    const { resolvedTheme } = useTheme();
    const { data: products, isLoading, isError } = useGetAllProductsQuery({});

    const isDark = resolvedTheme === "dark";

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !products || products.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl text-muted-foreground">
                    No products found.
                </p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "py-8 min-h-screen transition-colors duration-300",
                isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            )}
        >
            <div className="container mx-auto max-w-7xl px-4">
                <h1 className="text-3xl font-bold mb-8">All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
