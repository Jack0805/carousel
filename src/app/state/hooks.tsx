import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {RootState, AppDispatch} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>(); // AppDispatch is needed if working with Async actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;