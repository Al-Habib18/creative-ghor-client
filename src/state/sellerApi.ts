/** @format */

import { api } from "./api";
import { Product } from "@/types";

const sellerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllProductsOfSeller: builder.query<
            Product[],
            { category?: string; id: string }
        >({
            query: ({ category, id }) => ({
                url: `/users/${id}/products`,
                params: category ? { category } : undefined,
            }),
            providesTags: ["Products"],
        }),
    }),
});

export const { useGetAllProductsOfSellerQuery } = sellerApi;
