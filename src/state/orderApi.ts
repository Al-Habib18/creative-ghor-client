/** @format */

import { api } from "./api";
import { Order } from "@/types";

const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<Order, Order>({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
});

export const { useCreateOrderMutation } = orderApi;
