/** @format */

import { api } from "./api";
import { ShippingAddress } from "@/types";

const shippingAddressApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createShippingAddress: builder.mutation<
            ShippingAddress,
            ShippingAddress
        >({
            query: (ShippingAddress) => ({
                url: "/shipping-addresses",
                method: "POST",
                body: ShippingAddress,
            }),
            invalidatesTags: ["ShippingAddress"],
        }),
    }),
});

export const { useCreateShippingAddressMutation } = shippingAddressApi;
