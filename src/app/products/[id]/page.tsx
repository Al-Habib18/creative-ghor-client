/** @format */
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { addToCart } from "@/state/cartSlice";
import { useTheme } from "next-themes";
import { useGetSingleProductQuery } from "@/state/productApi";
import CheckoutButton from "@/components/CheckoutButton";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import renderStars from "@/components/renderStars";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { createDraftOrder } from "@/state/orderSlice";

export default function ProductDetailsPage() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const {
        data: product,
        isLoading,
        error,
    } = useGetSingleProductQuery(id as string);

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                stock: product.stock,
            })
        );
    };

    if (isLoading) return <Loading />;
    if (error || !product) return <ErrorMessage />;

    const originalPrice = (
        product.price +
        (product.price * product.discount) / 100
    ).toFixed(2);

    return (
        <section
            className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
                isDark ? "bg-zinc-900 text-white" : "bg-white text-black"
            }`}
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 rounded-2xl shadow-lg p-6 bg-white dark:bg-zinc-800">
                {/*TODO: implement Product Image */}
                <div className="w-full md:w-1/2">
                    <Image
                        src={/* product.image ||  */ "/placeholder.jpeg"}
                        alt={product.name}
                        width={500}
                        height={400}
                        priority
                        className="rounded-xl object-cover w-full h-auto border border-gray-200 dark:border-zinc-700"
                    />
                </div>

                {/* Product Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-3">
                            {product.name}
                        </h1>

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

                        <div className="text-sm text-yellow-500 mb-4">
                            <div className="flex items-center gap-1">
                                {renderStars(product.rating)}
                                <span className="text-xs text-muted-foreground">
                                    ({product.reviewsCount})
                                </span>
                            </div>
                        </div>

                        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                            {product.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-4 flex-wrap">
                        <button
                            onClick={handleAddToCart}
                            className={`px-6 py-3 rounded-xl text-sm font-medium transition-colors shadow ${
                                isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-black text-white hover:bg-gray-800"
                            }`}
                        >
                            Add to Cart
                        </button>

                        <CheckoutButton
                            name="Shop Now"
                            redirectUrl="/checkout/shipping"
                            onBeforeRedirect={() => {
                                const productIds = cartItems.map(
                                    (item) => item.id
                                );
                                const quantity = cartItems.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0
                                );
                                const totalAmount = cartItems.reduce(
                                    (sum, item) =>
                                        sum + item.price * item.quantity,
                                    0
                                );

                                dispatch(
                                    createDraftOrder({
                                        productIds,
                                        quantity,
                                        totalAmount,
                                    })
                                );
                            }}
                        />
                    </div>

                    {/* Meta Info */}
                    <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <p>
                            <span className="font-medium">Category:</span>{" "}
                            {product.category}
                        </p>
                        <p>
                            <span className="font-medium">Stock:</span>{" "}
                            {product.stock > 0
                                ? `${product.stock} available`
                                : "Out of stock"}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
