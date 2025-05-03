/** @format */

"use client";

import { useAppSelector, useAppDispatch } from "@/state/redux";
import { removeFromCart, clearCart } from "@/state/cartSlice";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>Your cart is empty.</p>
                    <Link
                        href="/products"
                        className="text-blue-500 mt-2 inline-block"
                    >
                        Go shopping
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid gap-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-white shadow p-4 rounded-md"
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded object-cover"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            Price: ${item.price.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <div className="text-xl font-bold">
                            Total: ${totalPrice.toFixed(2)}
                        </div>
                        <div className="space-x-4">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Clear Cart
                            </button>
                            <Link
                                href="/checkout"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
