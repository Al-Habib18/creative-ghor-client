/** @format */

// components/admin/ProductCard.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
    onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/admin/products/edit/${product.id}/`);
    };

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            onDelete(product.id);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-40 h-40">
                <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {product.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        <Badge variant="outline">Stock: {product.stock}</Badge>
                        <Badge variant="outline">
                            Rating: {product.rating ?? 0}
                        </Badge>
                        <Badge variant="outline">
                            Reviews: {product.reviewsCount ?? 0}
                        </Badge>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-green-600">
                            ৳{product.price.toFixed(2)}
                        </span>
                        {product.discount && (
                            <span className="ml-2 text-sm text-red-500 line-through">
                                ৳{(product.price + product.discount).toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
