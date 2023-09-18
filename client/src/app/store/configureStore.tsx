import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BasketSlice } from "../../features/basket/BasketSlice";

export const store=configureStore({
    reducer:{
        basket:BasketSlice.reducer
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAPPDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
