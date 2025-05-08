/** @format */

"use client";

import { useAppSelector, useAppDispatch } from "@/state/redux";
import {
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
} from "@/state/cartSlice";
import Image from "next/image";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

const CartPage = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">
                Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-300 space-y-6">
                    <p className="text-lg">Your cart is currently empty.</p>
                    <Link
                        href="/products"
                        className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Cart Items */}
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white dark:bg-zinc-800 shadow-md rounded-xl p-5 gap-6"
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-5 flex-1">
                                    <Image
                                        src={item.image || "/placeholder.jpeg"}
                                        alt={`Image of ${item.name}`}
                                        width={80}
                                        height={80}
                                        className="rounded-lg object-cover border border-gray-200 dark:border-zinc-700"
                                    />
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            <span className="font-medium">
                                                ${item.price.toFixed(2)}
                                            </span>{" "}
                                            × {item.quantity}
                                        </p>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            In Stock: {item.stock}
                                        </p>
                                    </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item.id))
                                        }
                                        className="px-3 py-1 bg-gray-200 dark:bg-zinc-600 text-sm rounded hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
                                    >
                                        −
                                    </button>
                                    <span className="text-gray-800 dark:text-white font-medium">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            dispatch(increaseQuantity(item.id))
                                        }
                                        disabled={item.quantity >= item.stock}
                                        className={`px-3 py-1 text-sm rounded transition ${
                                            item.quantity >= item.stock
                                                ? "bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed"
                                                : "bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-500"
                                        }`}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                    className="text-sm px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Total + Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 dark:bg-zinc-700 p-6 rounded-xl shadow-inner">
                        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
                            Total: ${totalPrice.toFixed(2)}
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                            >
                                Clear Cart
                            </button>
                            <CheckoutButton redirectUrl="/checkout/shipping" />
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href="/products"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition font-medium"
                        >
                            Shop More
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
