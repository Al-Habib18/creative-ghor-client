/** @format */

"use client";

import React from "react";
import ProductCard from "@/components/admin/ProductCard";
import { Product } from "@/types";
import { useGetAllProductsQuery } from "@/state/productApi";
import Loading from "@/components/Loading";

const AdminProductList: React.FC = () => {
    const { data: products, isLoading, isError } = useGetAllProductsQuery({});

    const handleDelete = (id: string) => {
        // Implement delete functionality here
        console.log(`Delete product with id: ${id}`);
    };

    if (isLoading) return <Loading message="Loading products..." />;
    if (isError)
        return <p className="text-red-500">Failed to load products.</p>;

    return (
        <div className="p-6 space-y-4">
            {products?.map((product: Product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default AdminProductList;
