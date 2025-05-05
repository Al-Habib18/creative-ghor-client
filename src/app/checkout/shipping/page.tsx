/** @format */

"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ShippingAddress } from "@/types";
import { useCreateShippingAddressMutation } from "@/state/shippingApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ShippingPage() {
    const router = useRouter();
    const [createShippingAddress, { isLoading, error }] =
        useCreateShippingAddressMutation();
    const [shippingAddressId, setShippingAddressId] = useState<string | null>(
        null
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingAddress>();

    const onSave = async (data: ShippingAddress) => {
        try {
            const ShippingAddress = await createShippingAddress(data).unwrap();
            setShippingAddressId(ShippingAddress.id);

            toast.success("Shipping address saved.");
            router.push("/checkout/payment");
        } catch (err) {
            console.error("Shipping address submission failed:", err);
            toast.error("Failed to save shipping address. Please try again.");
        }
    };

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900 text-black dark:text-white">
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

                    {error && (
                        <p className="text-red-500 text-sm">
                            Something went wrong. Please try again.
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full  ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? "Saving..." : "Save Shipping Address"}
                    </Button>
                    {/* ccreate a checklist for payment */}
                    {/* TODO: create a button  */}
                    <Button>Continue</Button>
                </form>
            </div>
        </div>
    );
}
