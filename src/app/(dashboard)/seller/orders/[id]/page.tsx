/** @format */

"use client";

import { useParams, useRouter } from "next/navigation";
import {
    useGetSingleOrderQuery,
    useDeleteOrderMutation,
} from "@/state/orderApi";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { Pencil, Trash, ArrowLeft } from "lucide-react";
import Loading from "@/components/Loading";

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    console.log("id:-", id);

    const {
        data: order,
        isLoading,
        isError,
    } = useGetSingleOrderQuery(id as string);
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

    const handleDelete = async () => {
        const confirm = window.confirm(
            "Are you sure you want to delete this order?"
        );
        if (!confirm) return;

        try {
            await deleteOrder(id as string).unwrap();
            router.push("/seller/orders");
        } catch (error) {
            console.error("Failed to delete order", error);
        }
    };

    if (isLoading) return <Loading message="Order loading..." />;

    if (isError || !order) {
        return (
            <div>
                <p className="text-center text-red-500">Order not found.</p>
                <Button onClick={() => router.back()}>Back</Button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-800 dark:text-white">
                    Order Details
                </h1>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => router.push("/seller/orders")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            router.push(`/seller/orders/edit/${order.id}`)
                        }
                    >
                        <Pencil className="w-4 h-4 mr-1" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        <Trash className="w-4 h-4 mr-1" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow border dark:border-zinc-700 space-y-4">
                <div>
                    <h2 className="font-semibold text-lg text-zinc-800 dark:text-white">
                        Order Info
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Order ID: {order.id}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        User ID: {order.userId}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Created: {new Date(order.createdAt!).toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="text-sm">
                        <span className="block text-zinc-500">Status</span>
                        <span
                            className={cn(
                                "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                                order.orderStatus === "PENDING"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : order.orderStatus === "DELIVERED"
                                    ? "bg-green-200 text-green-800"
                                    : order.orderStatus === "CANCELLED"
                                    ? "bg-red-200 text-red-800"
                                    : "bg-blue-200 text-blue-800"
                            )}
                        >
                            {order.orderStatus}
                        </span>
                    </div>
                    <div className="text-sm">
                        <span className="block text-zinc-500">Payment</span>
                        <span
                            className={cn(
                                "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                                order.paymentStatus === "PAID"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            )}
                        >
                            {order.paymentStatus}
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-zinc-800 dark:text-white mb-1">
                        Order Summary
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Quantity: {order.quantity}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Total Amount: ${order.totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
