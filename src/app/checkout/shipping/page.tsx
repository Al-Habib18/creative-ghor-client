/** @format */
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ShippingAddress } from "@/types";
import { useCreateShippingAddressMutation } from "@/state/shippingApi";
import { useCreatePaymentMutation } from "@/state/paymentApi";
import { useCreateOrderMutation } from "@/state/orderApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/state/redux";
import { clearCart } from "@/state/cartSlice";
import { CreditCard, HandCoins, Loader2 } from "lucide-react";

export default function ShippingPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [createShippingAddress, { isLoading: isSavingShipping }] =
        useCreateShippingAddressMutation();
    const [createOrder, { isLoading: isCreatingOrder }] =
        useCreateOrderMutation();
    const [createPayment] = useCreatePaymentMutation();

    const [shippingAddressId, setShippingAddressId] = useState<string | null>(
        null
    );
    const [paymentMethod, setPaymentMethod] = useState<
        "cod" | "sslcommerz" | null
    >(null);

    const cartItems = useAppSelector((state) => state.cart.items);
    const productIds = cartItems.map((item) => item.id);
    const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingAddress>();

    const onSave = async (data: ShippingAddress) => {
        try {
            const saved = await createShippingAddress(data).unwrap();
            setShippingAddressId(saved.id);
            toast.success("Shipping address saved.");
        } catch (err) {
            console.error("Shipping address submission failed:", err);
            toast.error("Failed to save shipping address. Please try again.");
        }
    };

    const handleContinue = async () => {
        if (!shippingAddressId || !paymentMethod) {
            toast.error(
                "Please complete the shipping info and select a payment method."
            );
            return;
        }

        try {
            const orderData = {
                shippingAddressId,
                productIds,
                quantity,
                totalAmount,
            };

            if (productIds.length === 0) {
                toast.error("Please add products to cart.");
                return;
            }
            // create order
            const order = await createOrder(orderData).unwrap();

            dispatch(clearCart()); // Clear the cart

            toast.success("Order placed successfully.");

            if (paymentMethod === "cod") {
                router.push(`/checkout/confirmation?orderId=${order.id}`);
            } else if (paymentMethod === "sslcommerz") {
                try {
                    const orderId = order?.id || "";

                    const response = await createPayment({
                        orderId,
                    }).unwrap();

                    if (response?.GatewayPageURL) {
                        window.location.href = response.GatewayPageURL;
                    } else {
                        throw new Error("Gateway URL not returned");
                    }
                } catch (err) {
                    console.error("Payment initiation failed:", err);
                    toast.error("Payment initiation failed. Please try again.");
                }
            }
        } catch (err) {
            console.error("Order creation failed:", err);
            toast.error("Failed to place order. Try again.");
        }
    };

    return (
        <div className="min-h-screen space-y-6 py-4  px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900 text-black dark:text-white">
            <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Shipping Information
                </h1>

                <form onSubmit={handleSubmit(onSave)} className="space-y-6">
                    {[
                        ["division", "Division"],
                        ["district", "District"],
                        ["upzila", "Upazila"],
                        ["postalCode", "Postal Code"],
                        ["phoneNumber", "Phone Number"],
                    ].map(([field, label]) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block mb-1 font-medium"
                            >
                                {label}
                            </label>
                            <input
                                id={field}
                                type="text"
                                {...register(field as keyof ShippingAddress, {
                                    required: `${label} is required`,
                                })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-700"
                            />
                            {errors[field as keyof ShippingAddress] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                        errors[field as keyof ShippingAddress]
                                            ?.message as string
                                    }
                                </p>
                            )}
                        </div>
                    ))}

                    <Button
                        type="submit"
                        disabled={isSavingShipping}
                        className={`w-full ${
                            isSavingShipping
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        {isSavingShipping
                            ? "Saving..."
                            : "Save Shipping Address"}
                    </Button>
                </form>
            </div>
            <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-md">
                <div className="">
                    <h1 className="text-3xl font-bold text-center mb-6">
                        Choose Payment Method
                    </h1>
                    <div className="space-y-4">
                        <label
                            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                                paymentMethod === "cod"
                                    ? "border-green-600 bg-green-50 dark:bg-green-900"
                                    : "border-gray-300 dark:border-zinc-700"
                            }`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                onChange={() => setPaymentMethod("cod")}
                                checked={paymentMethod === "cod"}
                                className="mr-2"
                                disabled={isCreatingOrder}
                            />
                            <HandCoins className="text-green-600" />
                            <span className="text-sm font-medium">
                                Cash on Delivery
                            </span>
                        </label>
                        <label
                            className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                                paymentMethod === "sslcommerz"
                                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900"
                                    : "border-gray-300 dark:border-zinc-700"
                            }`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="sslcommerz"
                                onChange={() => setPaymentMethod("sslcommerz")}
                                checked={paymentMethod === "sslcommerz"}
                                className="mr-2"
                                disabled={isCreatingOrder}
                            />
                            <CreditCard className="text-blue-600" />
                            <span className="text-sm font-medium">
                                Pay with SSLCommerz
                            </span>
                        </label>
                    </div>

                    <Button
                        onClick={handleContinue}
                        disabled={
                            !shippingAddressId ||
                            !paymentMethod ||
                            isCreatingOrder
                        }
                        className="w-full mt-4"
                    >
                        {isCreatingOrder ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin" size={18} />
                                Processing...
                            </span>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
