import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from "./Slices/CouresSlice";

const reducer = combineReducers({
    authSliceReducer,
    courseSliceReducer
})

const store  = configureStore({
    reducer,
})

export default store;