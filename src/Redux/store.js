import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from "./Slices/CouresSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";

const reducer = combineReducers({
    authSliceReducer,
    courseSliceReducer,
    RazorpaySliceReducer
})

const store  = configureStore({
    reducer,
})

export default store;