/** @format */
"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
    useGetSingleProductQuery,
    useDeleteProductMutation,
} from "@/state/productApi";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function SellerProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        data: product,
        isLoading,
        error,
    } = useGetSingleProductQuery(id as string);
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async () => {
        if (!product) return;

        const confirmed = confirm(
            `Are you sure you want to delete "${product.name}"?`
        );
        if (!confirmed) return;

        try {
            setIsDeleting(true);
            await deleteProduct(product.id).unwrap();
            toast.success("Product deleted successfully");
            router.push("/dashboard/products");
        } catch (err) {
            toast.error("Failed to delete product.");
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) return <Loading />;
    if (error || !product) return <ErrorMessage />;

    const originalPrice = (
        product.price +
        (product.price * product.discount) / 100
    ).toFixed(2);

    return (
        <section className="min-h-screen py-12 px-6 bg-white dark:bg-zinc-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
                {/* Left: Image */}
                <div className="w-full md:w-1/2">
                    <Image
                        src={product.image || "/placeholder.jpeg"}
                        alt={product.name}
                        width={500}
                        height={400}
                        priority
                        className="rounded-xl object-cover w-full h-auto border border-gray-200 dark:border-zinc-700"
                    />
                </div>

                {/* Right: Product Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
                            {product.name}
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Product ID: {product.id}
                        </p>

                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-semibold text-green-500">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.discount > 0 && (
                                <span className="text-md text-red-500 line-through">
                                    ${originalPrice}
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-yellow-500 mb-4">
                            Rating: {product.rating} ({product.reviewsCount}{" "}
                            reviews)
                        </p>

                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {product.description}
                        </p>

                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>
                                <strong>Category:</strong> {product.category}
                            </p>
                            <p>
                                <strong>Stock:</strong>{" "}
                                {product.stock > 0
                                    ? `${product.stock} units`
                                    : "Out of stock"}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        <Link
                            href={`/dashboard/products/edit/${product.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm"
                        >
                            Edit Product
                        </Link>

                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm disabled:opacity-50"
                        >
                            {isDeleting ? "Deleting..." : "Delete Product"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
