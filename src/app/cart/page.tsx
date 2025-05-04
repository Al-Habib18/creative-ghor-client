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
            <h1 className="text-3xl font-bold mb-8 text-center">
                Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p className="text-lg mb-4">
                        Your cart is currently empty.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 mb-8  bg-white text-black dark:text-white  dark:bg-zinc-900">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.image}
                                        alt={`Image of ${item.name}`}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Price: ${item.price.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                    className="text-red-600 bg-gray-400 px-4 py-2 rounded hover:text-red-800 text-sm font-medium transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg shadow-inner">
                        <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                            Total: ${totalPrice.toFixed(2)}
                        </div>
                        <div className="space-x-4">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Clear Cart
                            </button>
                            <CheckoutButton />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
