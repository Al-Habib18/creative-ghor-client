/** @format */

import { api } from "./api";
import { Order } from "@/types";

type OrderFilters = {
    orderStatus?: string;
    paymentStatus?: string;
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
        getAllOrders: builder.query<Order[], OrderFilters | void>({
            query: (filters: any) => {
                const params = new URLSearchParams();

                if (filters?.orderStatus)
                    params.append("orderStatus", filters.orderStatus);
                if (filters?.paymentStatus)
                    params.append("paymentStatus", filters.paymentStatus);

                const queryString = params.toString();
                return `/orders?${queryString ? `${queryString}` : "#"}`;
            },
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
