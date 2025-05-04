/** @format */

import OrderTable from "@/components/seller/OrderTable";

interface Order {
    id: string;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    createdAt: string;
}

const mockOrders: Order[] = [
    {
        id: "1",
        totalAmount: 100,
        orderStatus: "Delivered",
        paymentStatus: "Paid",
        createdAt: "2023-08-01",
    },
    {
        id: "2",
        totalAmount: 200,
        orderStatus: "Shipped",
        paymentStatus: "Pending",
        createdAt: "2023-08-02",
    },
    {
        id: "3",
        totalAmount: 150,
        orderStatus: "Pending",
        paymentStatus: "Unpaid",
        createdAt: "2023-08-03",
    },
];

export default function OrdersPage() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Orders</h1>
            <OrderTable orders={mockOrders} />
        </div>
    );
}
