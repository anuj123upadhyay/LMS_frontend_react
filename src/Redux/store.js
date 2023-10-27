import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice'

const reducer = combineReducers({
    authSliceReducer
})

const store  = configureStore({
    reducer,
})

export default store;