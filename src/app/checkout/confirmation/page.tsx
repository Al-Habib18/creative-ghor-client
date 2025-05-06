/** @format */
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfirmationPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        // Fire confetti once when page loads
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-zinc-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 sm:p-10 text-center"
            >
                <CheckCircle size={56} className="mx-auto text-green-500" />

                <h1 className="mt-6 text-3xl font-bold text-zinc-800 dark:text-white">
                    Thank you for your order!
                </h1>

                <p className="mt-3 text-zinc-600 dark:text-zinc-300 text-base sm:text-lg">
                    Your order was successful. You can track your order anytime.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {orderId && (
                        <Link href={`/dashboard/orders/${orderId}`}>
                            <Button className="w-full sm:w-auto">
                                See Order Status
                            </Button>
                        </Link>
                    )}

                    <Link
                        href="/"
                        className="text-blue-600 hover:underline text-sm sm:text-base font-medium"
                    >
                        Continue Shopping →
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
