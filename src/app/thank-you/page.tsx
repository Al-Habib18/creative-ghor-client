/** @format */

import Link from "next/link";
export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold mb-4">🎉 Thank You!</h1>
            <p>Your order has been placed successfully.</p>

            <p className="mt-4">
                <Link href="/" className="text-blue-500 hover:underline">
                    Continue Shopping
                </Link>
            </p>
        </div>
    );
}
