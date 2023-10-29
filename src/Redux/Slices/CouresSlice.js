import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData: []
}

export const getAllCouses = createAsyncThunk("/course/get",async ()=>{// ek prakar se action hota hai jisse dispatch method ke jareie dispatch kiya jata hai.
    try{
        const res = axiosInstance.get("/courses");
        toast.promise(res,{
            loading:"loading course data .. ",
            success:"Courses loaded successfully",
            error:"Failed to load courses",
        });
        return (await res).data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{  // handle  the changes in the slice
        builder.addCase(getAllCouses.fulfilled, (state,action)=>{
            if(action.payload){
                state.courseData= [...action.payload];


            }
        })


    }
})

export default courseSlice.reducer;