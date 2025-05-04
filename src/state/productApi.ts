/** @format */

import { api } from "./api";
import { Product } from "@/types";

const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], { category?: string }>({
            query: ({ category }) => ({
                url: "/products",
                params: category ? { category } : undefined,
            }),
            providesTags: ["Products"],
        }),

        getSingleProduct: builder.query<Product, { id: string }>({
            query: ({ id }) => `/products/${id}`,
            providesTags: ["Products"],
        }),

        createProduct: builder.mutation<Product, FormData>({
            query: (formData) => ({
                url: "/products",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Products"],
        }),

        updateProduct: builder.mutation<
            Product,
            { id: string; data: FormData }
        >({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
