/** @format */

import { api } from "./api";
import { User } from "@/types";
const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation<User, Partial<User> & { userId: string }>({
            query: ({ userId, ...updatedUser }) => ({
                url: `api/users/clerk/${userId}`,
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useUpdateUserMutation } = userApi;
