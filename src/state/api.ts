/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";
import { Clerk } from "@clerk/clerk-js";
import { toast } from "sonner";
const customBaseQuery = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any
) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: async (headers) => {
            const token = await window.Clerk?.session?.getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });

    try {
        const result = await baseQuery(args, api, extraOptions);

        if (result.error) {
            const errorData = result.error.data;
            const errorMessage =
                errorData?.message ||
                result.error.status?.toString() ||
                "An error occurred";

            toast.error(`Error: ${errorMessage}`);

            return { error: result.error };
        }

        const isMutationRequest =
            (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

        if (isMutationRequest && result.data?.message) {
            toast.success(result.data.message);
        }

        // Ensure we always return `{ data: ... }`
        if (
            result.meta?.response?.status === 204 ||
            result.data === undefined
        ) {
            return { data: null };
        }

        // If backend wraps response like: { data: {...} }
        if (result.data?.data) {
            return { data: result.data.data };
        }

        return { data: result.data };
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";

        toast.error(errorMessage);

        return {
            error: {
                status: "FETCH_ERROR",
                error: errorMessage,
            },
        };
    }
};

export const api = createApi({
    baseQuery: customBaseQuery,
    reducerPath: "api",
    tagTypes: [
        "Users",
        "Products",
        "Reviews",
        "Orders",
        "Payments",
        "ShippingAddress",
    ],
    endpoints: () => ({}),
});
