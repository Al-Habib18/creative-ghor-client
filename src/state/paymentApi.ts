/** @format */

import { api } from "./api"; // your base API slice

interface CreatePaymentRequest {
    orderId: string;
}

interface CreatePaymentResponse {
    GatewayPageURL: string;
}

const paymentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<
            CreatePaymentResponse,
            CreatePaymentRequest
        >({
            query: ({ orderId }: CreatePaymentRequest) => ({
                url: "/payment/init",
                method: "POST",
                body: { orderId },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
    overrideExisting: false, // Optional: prevents re-definition
});

export const { useCreatePaymentMutation } = paymentApi;
