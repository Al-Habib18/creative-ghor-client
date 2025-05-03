/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
    user: any; // Replace with Clerk User type or your custom type
    theme: "light" | "dark";
}

const initialState: GlobalState = {
    user: null,
    theme: "light",
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.theme = action.payload;
        },
    },
});

export const { setUser, toggleTheme, setTheme } = globalSlice.actions;
export default globalSlice.reducer;
