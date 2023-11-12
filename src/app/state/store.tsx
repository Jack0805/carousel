import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "./movies/movieSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    },
    devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;