import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]

}
// getrazorpayId
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async ()=>{
    try{
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;

    }catch(error){
        toast.error("Failed to load data")
    }
}) 
//purchaseCourseBundle
export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse", async ()=>{
    try{
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
        
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
}) 

//verifyUserPayments

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data)=>{
    try{
        const response = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature : data.razorpay_signature
        });
        return response.data;
        
    }catch(error){
        toast.error("Failed to load data")
    }
}) 


// getPaymentRecord
export const getPaymentRecord = createAsyncThunk("/payments/record", async ()=>{
    try{
        const response = await axiosInstance.get("/payments?count=100");
        toast.promise(response,{
            loading:"Getting the payments records",
            sucess:(data)=>{
                return data?.data?.message
            },
            error:"Failed to get payments records"
        })
        return (await response).data;
        
    }catch(error){
        toast.error("opertaion failed")
    }
}) 
//cancel subscription

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async ()=>{
    try{
        const response = await axiosInstance.get("/payments/unsubscribe");
        toast.promise(response,{
            loading:"unsubscribe the bundle",
            sucess:(data)=>{
                return data?.data?.message
            },
            error:"Failed to unsubscribe"

        })
        return (await response).data;
        
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
}) 






const razorpaySlice = createSlice({
    name:"razorpay",
    initialState,
    reducers,
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled, (state,action)=>{
            state.key= action?.payload.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state,action)=>{
            console.log(action);
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;

        })
        .addCase(verifyUserPayment.rejected, (state,action)=>{
            console.log(actions);
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;

        })
        .addCase(getPaymentRecord.fulfilled, (state,action)=>{
            
            state.allPayments = action?.payload?.allPayments;
            state.finalMonths = action?.payload?.finalMonths
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;

        })

    }
})

export default razorpaySlice.reducer;