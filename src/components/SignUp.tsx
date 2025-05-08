/** @format */

"use client";

import { SignUp } from "@clerk/nextjs";
import React from "react";
import { dark } from "@clerk/themes";

const SignUpComponent = () => {
    return (
        <SignUp
            appearance={{
                baseTheme: dark,
                elements: {
                    rootBox: "flex justify-center items-center py-5",
                    cardBox: "shadow-none",
                    card: "bg-customgreys-secondarybg w-full shadow-none",
                    footer: {
                        background: "#25262F",
                        padding: "0rem 2.5rem",
                        "& > div > div:nth-child(1)": {
                            background: "#25262F",
                        },
                    },
                    formFieldLabel: "text-white-50 font-normal",
                    formButtonPrimary:
                        "bg-primary-700 text-white-100 hover:bg-primary-600 !shadow-none",
                    formFieldInput:
                        "bg-customgreys-primarybg text-white-50 !shadow-none",
                    footerActionLink: "text-primary-750 hover:text-primary-600",
                },
            }}
            routing="hash"
            afterSignOutUrl="/"
            unsafeMetadata={{
                role: "user", // Set the default role
            }}
        />
    );
};

export default SignUpComponent;

// src/components/SignUp.tsx
/*  
"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"user" | "seller" | "admin">("user");

    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        try {
            const result = await signUp.create({
                emailAddress: email,
                password,
            });

            // Save the role to publicMetadata
            await signUp.update({
                publicMetadata: {
                    userType: role,
                },
            });

            // Complete the sign-up flow (magic link or verification code)
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            // For demo purposes, you can auto-activate (if allowed):
            await setActive({ session: result.createdSessionId });

            router.push("/verify-email"); // or redirect to login
        } catch (err: any) {
            console.error("Sign-up failed:", err.errors);
        }
    };

    return (
        <form onSubmit={handleSignUp} className="space-y-4 max-w-md mx-auto">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 w-full"
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="border p-2 w-full"
            >
                <option value="user">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white p-2 w-full">
                Sign Up
            </button>
        </form>
    );
}
*/
