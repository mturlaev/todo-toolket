import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "../features/todoReducer"
import todoSlice from "../features/todoSlice"

export const store = configureStore({
    reducer: todoSlice
})
