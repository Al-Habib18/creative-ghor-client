/** @format */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { OrderStatusEnum, PaymentStatusEnum } from "@/types";
import {
    useGetSingleOrderQuery,
    useUpdateOrderMutation,
} from "@/state/orderApi";
import Loading from "@/components/Loading";

const OrderEditPage = () => {
    const router = useRouter();
    const { id } = useParams();

    const {
        data: order,
        isLoading,
        isError,
    } = useGetSingleOrderQuery(id as string);

    const [updateOrder] = useUpdateOrderMutation();

    const [orderStatus, setOrderStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (order) {
            setOrderStatus(order.orderStatus || "");
            setPaymentStatus(order.paymentStatus || "");
        }
    }, [order]);

    const handleUpdate = async () => {
        try {
            await updateOrder({
                id: id as string,
                orderStatus,
                paymentStatus,
            });
            router.push(`/admin/orders/${id}`);
        } catch (err) {
            console.error("Failed to update order", err);
            setError("Failed to update order.");
        }
    };

    if (isLoading) return <Loading message="Loading order..." />;

    if (isError || !order)
        return (
            <div>
                {" "}
                <Button onClick={() => router.push("/admin/orders")}>
                    <MoveLeft className="mr-2 h-4 w-4" />
                    Go back
                </Button>
                <p className="text-center text-2xl text-red-500">
                    Failed to fetch order.
                </p>
            </div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Edit Order</h1>

            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Order Status
                    </label>
                    <Select value={orderStatus} onValueChange={setOrderStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(OrderStatusEnum).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
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
                            {Object.values(PaymentStatusEnum).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex gap-4 mt-6">
                    <Button onClick={handleUpdate}>Update Order</Button>

                    <Button
                        variant="outline"
                        onClick={() => router.push(`/admin/orders/${id}`)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderEditPage;
