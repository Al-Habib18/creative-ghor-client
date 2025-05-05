/** @format */

"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

type CheckoutButtonProps = {
    redirectUrl?: string;
    name?: string;
    onBeforeRedirect?: () => void;
};

const CheckoutButton = ({
    redirectUrl = "/checkout/shipping",
    name = "Checkout",
    onBeforeRedirect,
}: CheckoutButtonProps) => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleCheckout = () => {
        if (isSignedIn) {
            onBeforeRedirect?.(); // Dispatch Redux action, etc.
            router.push(redirectUrl);
        } else {
            // Open Clerk modal
            document.getElementById("clerk-modal-trigger")?.click();
        }
    };

    return (
        <>
            <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            >
                {name}
            </button>

            {/* Clerk modal trigger */}
            <SignInButton mode="modal" forceRedirectUrl={redirectUrl}>
                <button id="clerk-modal-trigger" style={{ display: "none" }} />
            </SignInButton>
        </>
    );
};

export default CheckoutButton;
