/** @format */

import { api } from "./api";
import { Order, OrderStatusEnum, PaymentStatusEnum } from "@/types";

type OrderFilters = {
    page?: number;
    limit?: number;
    orderStatus?: OrderStatusEnum;
    paymentStatus?: PaymentStatusEnum;
};

type UpdateOrder = {
    id: string;
    orderStatus?: string;
    paymentStatus?: string;
};

const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<Order, Order>({
            query: (order: Order) => ({
                url: "/orders",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Orders"],
        }),
        updateOrder: builder.mutation<Order, UpdateOrder>({
            query: (order: UpdateOrder) => ({
                url: `/orders/${order.id}`,
                method: "PUT",
                body: order,
            }),
            invalidatesTags: ["Orders"],
        }),
        getSingleOrder: builder.query<Order, string>({
            query: (id) => `/orders/${id}`,
            providesTags: ["Orders"],
        }),
        deleteOrder: builder.mutation<Order, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"],
        }),
        getAllOrders: builder.query<Order[], OrderFilters>({
            query: ({ limit, page, orderStatus, paymentStatus }) => ({
                url: "/orders",
                params: {
                    ...(limit && { limit }),
                    ...(page && { page }),
                    ...(orderStatus && { orderStatus }),
                    ...(paymentStatus && { paymentStatus }),
                },
            }),
            providesTags: ["Orders"],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useGetSingleOrderQuery,
    useDeleteOrderMutation,
    useGetAllOrdersQuery,
} = orderApi;
