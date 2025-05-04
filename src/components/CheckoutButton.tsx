/** @format */

"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CheckoutButton = ({
    redirectUrl = "/shipping",
    name = "Checkout",
}: {
    redirectUrl?: string;
    name?: string;
}) => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleCheckout = () => {
        if (isSignedIn) {
            router.push(redirectUrl);
        } else {
            document.getElementById("clerk-modal-trigger")?.click();
        }
    };

    return (
        <>
            <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                {name}
            </button>

            {/* Hidden trigger for Clerk modal */}
            <SignInButton mode="modal" forceRedirectUrl={redirectUrl}>
                <button id="clerk-modal-trigger" style={{ display: "none" }} />
            </SignInButton>
        </>
    );
};

export default CheckoutButton;
