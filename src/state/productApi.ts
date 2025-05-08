/** @format */

import { api } from "./api";
import { CategoryEnum, Product } from "@/types";

type ProductFilter = {
    limit?: number;
    page?: number;
    category?: CategoryEnum;
    sortType?: string;
};

const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], ProductFilter>({
            query: ({ limit, page, category, sortType }) => ({
                url: "/products",
                params: {
                    ...(limit && { limit }),
                    ...(page && { page }),
                    ...(category && { category }),
                    ...(sortType && { sortType: sortType }), // sort=asc or sort=desc
                },
            }),
            providesTags: ["Products"],
        }),

        getSingleProduct: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: ["Products"],
        }),

        createProduct: builder.mutation<Product, FormData>({
            query: (formData: FormData) => ({
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
            query: ({ id, data }: { id: string; data: FormData }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),

        deleteProduct: builder.mutation<void, string>({
            query: (id: string) => ({
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
