/** @format */

"use client";
import { toast } from "sonner";

export default function PaymentPage() {
    const handlePayment = async () => {
        try {
            const token = await window.Clerk?.session?.getToken();
            if (!token) {
                toast.error("Unauthorized! Please log in.");
                return;
            }
            const res = await fetch("http://localhost:4000/api/payment/init", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: 1000,
                    currency: "BDT",
                }),
            });

            if (!res.ok) throw new Error("Payment initiation failed");

            const data = await res.json();

            if (data?.GatewayPageURL) {
                // Redirect to SSLCommerz payment gateway
                window.location.href = data.GatewayPageURL;
            } else {
                throw new Error("Gateway URL not returned");
            }
        } catch (err) {
            toast.error("Payment failed. Please try again.");
            console.error("Payment error:", err);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-10 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
            <div className="space-y-4">
                <p className="text-gray-600">Pay securely using SSLCommerz</p>
                <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Pay with SSLCommerz
                </button>
            </div>
        </div>
    );
}
