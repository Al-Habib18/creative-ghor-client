/** @format */

import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
