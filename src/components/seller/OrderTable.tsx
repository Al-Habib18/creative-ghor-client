/** @format */

"use client";

interface Order {
    id: string;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    createdAt: string;
}

interface OrderTableProps {
    orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border">
                <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-800">
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Payment</th>
                        <th className="px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center border-t">
                            <td className="px-4 py-2">{order.id}</td>
                            <td className="px-4 py-2">
                                ${order.totalAmount.toFixed(2)}
                            </td>
                            <td className="px-4 py-2">{order.orderStatus}</td>
                            <td className="px-4 py-2">{order.paymentStatus}</td>
                            <td className="px-4 py-2">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
