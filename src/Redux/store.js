import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from "./Slices/CouresSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";
import LecturesSliceReducer from "./Slices/LecturesSlice";

const reducer = combineReducers({
    authSliceReducer,
    courseSliceReducer,
    RazorpaySliceReducer,
    LecturesSliceReducer
})

const store  = configureStore({
    reducer,
})

export default store;