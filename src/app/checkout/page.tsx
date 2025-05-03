/** @format */

"use client";

import { useAppSelector, useAppDispatch } from "@/state/redux";
import { clearCart } from "@/state/cartSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [form, setForm] = useState({
        fullName: "",
        phoneNumber: "",
        division: "",
        district: "",
        upzila: "",
        postalCode: "",
    });

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (Object.values(form).some((v) => v.trim() === "")) {
            alert("Please fill out all fields");
            return;
        }

        // Simulate order submission
        console.log("Order submitted:", { form, cartItems, total });

        dispatch(clearCart());
        router.push("/thank-you"); // Or redirect to your success page
    };

    return (
        <div className="container mx-auto p-6 lg:p-0 max-w-7xl  text-black min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-white">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping form */}
                <div className="bg-white shadow p-6 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Shipping Information
                    </h2>
                    <div className="space-y-4">
                        {[
                            { name: "fullName", label: "Full Name" },
                            { name: "phoneNumber", label: "Phone Number" },
                            { name: "division", label: "Division" },
                            { name: "district", label: "District" },
                            { name: "upzila", label: "Upzila" },
                            { name: "postalCode", label: "Postal Code" },
                        ].map(({ name, label }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium">
                                    {label}
                                </label>
                                <input
                                    type="text"
                                    name={name}
                                    value={(form as any)[name]}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white shadow p-6 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>
                    <ul className="space-y-2">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between text-sm"
                            >
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <span>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-4" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
