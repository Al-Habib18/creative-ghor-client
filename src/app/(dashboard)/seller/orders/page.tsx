/** @format */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllOrdersQuery } from "@/state/orderApi";
import { Order, OrderStatusEnum, PaymentStatusEnum } from "@/types";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { cn } from "@/utils";

const orderStatusOptions = Object.values(OrderStatusEnum);
const paymentStatusOptions = Object.values(PaymentStatusEnum);

export default function AdminOrdersPage() {
    const router = useRouter();

    const [orderStatus, setOrderStatus] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [filtersApplied, setFiltersApplied] = useState(false);

    /*     const filters = filtersApplied
        ? {
              ...(orderStatus && { orderStatus }),
              ...(paymentStatus && { paymentStatus }),
          }
        : undefined; */

    const filters = {
        ...(filtersApplied && orderStatus && { orderStatus }),
        ...(filtersApplied && paymentStatus && { paymentStatus }),
    };

    const {
        data: orders = [],
        isLoading,
        isError,
    } = useGetAllOrdersQuery(filters);

    // Update URL when filters are applied
    useEffect(() => {
        if (filtersApplied) {
            const params = new URLSearchParams();
            if (orderStatus) params.set("orderStatus", orderStatus);
            if (paymentStatus) params.set("paymentStatus", paymentStatus);
            router.push(`/admin/orders?${params.toString()}`);
        }
    }, [filtersApplied, orderStatus, paymentStatus, router]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-zinc-800 dark:text-white">
                Manage Orders
            </h1>

            {/* Filter Section */}
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg shadow mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                            Order Status
                        </label>
                        <Select
                            value={orderStatus}
                            onValueChange={setOrderStatus}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {orderStatusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                            Payment Status
                        </label>
                        <Select
                            value={paymentStatus}
                            onValueChange={setPaymentStatus}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {paymentStatusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-6 flex gap-3 items-center">
                        <Button
                            size="sm"
                            className="gap-2 px-4 py-2 text-sm font-medium rounded-xl shadow-sm hover:bg-primary/90 transition"
                            onClick={() => setFiltersApplied(true)}
                        >
                            <Filter size={16} />
                            Apply Filters
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 px-4 py-2 text-sm font-medium rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition"
                            onClick={() => {
                                setOrderStatus("");
                                setPaymentStatus("");
                                setFiltersApplied(false);
                                router.push("/admin/orders");
                            }}
                        >
                            <RotateCcw size={16} />
                            Reset
                        </Button>
                    </div>
                </div>
            </div>

            {/* Loading/Error States */}
            {isLoading && (
                <p className="text-center text-zinc-600 dark:text-zinc-300">
                    Loading orders...
                </p>
            )}
            {isError && (
                <p className="text-center text-red-500">
                    Failed to load orders.
                </p>
            )}

            {/* Orders List */}
            <div className="grid grid-cols-1 gap-6">
                {orders.map((order: Order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-4 bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow"
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Order ID: {order.id}
                                </p>
                                <p className="font-medium text-zinc-800 dark:text-white">
                                    Total: ${order.totalAmount.toFixed(2)}
                                </p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Quantity: {order.quantity} | User ID:{" "}
                                    {order.userId}
                                </p>
                                <p className="text-sm mt-1 flex flex-wrap gap-2">
                                    <span
                                        className={cn(
                                            "px-2 py-1 rounded text-xs font-semibold",
                                            order.orderStatus === "PENDING"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : order.orderStatus ===
                                                  "DELIVERED"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-blue-200 text-blue-800"
                                        )}
                                    >
                                        {order.orderStatus}
                                    </span>
                                    <span
                                        className={cn(
                                            "px-2 py-1 rounded text-xs font-semibold",
                                            order.paymentStatus === "PAID"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        )}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center md:items-start">
                                <Link href={`/seller/orders/${order.id}`}>
                                    <Button variant="default" size="sm">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {!isLoading && orders.length === 0 && (
                <p className="text-center text-zinc-500 dark:text-zinc-400 mt-10">
                    No orders found.
                </p>
            )}
        </div>
    );
}
