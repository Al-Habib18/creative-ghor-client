/** @format */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CreditCard, HandCoins, Loader2 } from "lucide-react";
import { useCreatePaymentMutation } from "@/state/paymentApi";

export default function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState<
        "cod" | "sslcommerz" | ""
    >("");
    const [isProcessing, setIsProcessing] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    const [createPayment] = useCreatePaymentMutation();

    useEffect(() => {
        if (!orderId) {
            toast.error("Order ID not found. Redirecting...");
            setTimeout(() => router.push("/checkout/shipping"), 1500);
            return;
        }

        if (status === "failed") {
            toast("Payment Failed", {
                description:
                    "Your payment was not successful. Please try again.",
                action: {
                    label: "Retry",
                    onClick: () => {
                        router.replace(`/checkout/payment?id=${orderId}`);
                    },
                },
            });
        }
    }, [orderId, status, router]);

    const handleContinue = async () => {
        if (!paymentMethod) {
            toast.error("Please select a payment method.");
            return;
        }

        if (paymentMethod === "cod") {
            router.push(`/checkout/confirmation?orderId=${orderId}`);
            return;
        }

        try {
            setIsProcessing(true);
            const response = await createPayment({
                orderId: orderId!,
            }).unwrap();

            if (response?.GatewayPageURL) {
                window.location.href = response.GatewayPageURL;
            } else {
                throw new Error("Gateway URL not returned");
            }
        } catch (err) {
            console.error("Payment initiation failed:", err);
            toast.error("Payment initiation failed. Please try again.");
            setIsProcessing(false);
        }
    };

    const paymentOptions = [
        {
            value: "cod",
            label: "Cash on Delivery",
            icon: <HandCoins className="text-green-600" />,
            activeColor: "green",
        },
        {
            value: "sslcommerz",
            label: "Pay with SSLCommerz",
            icon: <CreditCard className="text-blue-600" />,
            activeColor: "blue",
        },
    ];

    return (
        <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
                    Choose Payment Method
                </h1>

                <div className="space-y-4">
                    {paymentOptions.map(
                        ({ value, label, icon, activeColor }) => (
                            <label
                                key={value}
                                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                                    paymentMethod === value
                                        ? `border-${activeColor}-600 bg-${activeColor}-50 dark:bg-${activeColor}-900`
                                        : "border-gray-300 dark:border-zinc-700"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={value}
                                    onChange={() =>
                                        setPaymentMethod(
                                            value as "cod" | "sslcommerz"
                                        )
                                    }
                                    checked={paymentMethod === value}
                                    className={`accent-${activeColor}-600`}
                                    disabled={isProcessing}
                                />
                                {icon}
                                <span className="text-sm font-medium dark:text-white">
                                    {label}
                                </span>
                            </label>
                        )
                    )}
                </div>

                <Button
                    onClick={handleContinue}
                    disabled={!orderId || !paymentMethod || isProcessing}
                    className="w-full mt-6"
                >
                    {isProcessing ? (
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
    );
}
