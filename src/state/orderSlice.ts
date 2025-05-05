/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface OrderState {
    shippingAddressId: string | null;
    productIds: string[];
    quantity: number;
    totalAmount: number;
}

const initialState: OrderState = {
    shippingAddressId: null,
    productIds: [],
    quantity: 0,
    totalAmount: 0,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createDraftOrder: (state, action) => {
            const { productIds, quantity, totalAmount } = action.payload;
            state.productIds = productIds;
            state.quantity = quantity;
            state.totalAmount = totalAmount;
        },
        resetOrder: () => initialState,
    },
});

export const { createDraftOrder, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
