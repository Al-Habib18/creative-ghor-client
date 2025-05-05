/** @format */

"use client";

import { useAppSelector, useAppDispatch } from "@/state/redux";
import { removeFromCart, clearCart } from "@/state/cartSlice";
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
        <div className="container mx-auto px-4 py-10 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-10 dark:text-white">
                Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-300">
                    <p className="text-lg mb-4">
                        Your cart is currently empty.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-10">
                    {/* Cart Items */}
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-zinc-800 shadow-md rounded-xl p-4 gap-4"
                            >
                                <div className="flex items-center gap-5">
                                    <Image
                                        src={
                                            /* item.image ||  */ "/placeholder.jpeg"
                                        }
                                        alt={`Image of ${item.name}`}
                                        width={80}
                                        height={80}
                                        className="rounded-lg object-cover border border-gray-200 dark:border-zinc-700"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold dark:text-white">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            ${item.price.toFixed(2)} ×{" "}
                                            {item.quantity}
                                        </p>
                                    </div>
                                </div>

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
                                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                            >
                                Clear Cart
                            </button>
                            <CheckoutButton />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
