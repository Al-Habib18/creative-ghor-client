/** @format */

"use client";
import Link from "next/link";

export default function ConfirmationPage() {
    return (
        <div className="max-w-2xl mx-auto py-10 text-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg">Your payment was successful.</p>

            <p className="mt-4">
                <Link href="/" className="text-blue-500 hover:underline">
                    Continue Shopping
                </Link>
            </p>
        </div>
    );
}
