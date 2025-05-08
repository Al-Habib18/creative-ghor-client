/** @format */

import { api } from "./api"; // or wherever your baseApi is defined

type CreateReviewBody = {
    productId: string;
    rating: number;
    comment: string;
};

const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation<any, CreateReviewBody>({
            query: (body) => ({
                url: "/reviews",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Reviews"], // better than providesTags if you're adding
        }),
    }),
});

export const { useCreateReviewMutation } = reviewApi;
