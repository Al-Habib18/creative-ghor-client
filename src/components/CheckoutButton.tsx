/** @format */

"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

type CheckoutButtonProps = {
    redirectUrl?: string;
    name?: string;
    onBeforeRedirect?: () => void;
    disabled?: boolean;
};

const CheckoutButton = ({
    redirectUrl = "/checkout/shipping",
    name = "Checkout",
    onBeforeRedirect,
    disabled = false,
}: CheckoutButtonProps) => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleCheckout = () => {
        if (disabled) return;

        if (isSignedIn) {
            onBeforeRedirect?.();
            router.push(redirectUrl);
        } else {
            document.getElementById("clerk-modal-trigger")?.click();
        }
    };

    return (
        <>
            <button
                disabled={disabled}
                onClick={handleCheckout}
                className={`px-4 py-2 rounded-md text-sm transition font-medium ${
                    disabled
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
                {name}
            </button>

            {/* Hidden Clerk Modal Trigger */}
            <SignInButton mode="modal" forceRedirectUrl={redirectUrl}>
                <button id="clerk-modal-trigger" style={{ display: "none" }} />
            </SignInButton>
        </>
    );
};

export default CheckoutButton;
