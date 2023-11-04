import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    lectures:[]
}

//  get course id thunk
//cid=> course id
export const  getCourseLecture = createAsyncThunk("/course/lecture/get",async (cid)=>{
    try{
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response,{
            loading:"Fetching couse lectures",
            success:"Lectures fetching successfully",
            error:"Failed to load lectures"
        })
        return (await reponse).data;

    }catch(error){
        toast.error(error?.response?.data?.message);
    }

} )


// add course lectures thunk
export const  addCourseLecture = createAsyncThunk("/course/lecture/add",async (data)=>{
    try{
        const formData = new FormData();
        formData.append("lectures", data.lectures);
        formData.append("title", data.title);
        formData.append("description", data.description);
        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response,{
            loading:"adding couse lectures",
            success:"Lectures added successfully",
            error:"Failed to add lectures"
        })
        return (await reponse).data;

    }catch(error){
        toast.error(error?.response?.data?.message);
    }

} )


// delete course

export const  deleteCourseLecture = createAsyncThunk("/course/lecture/delete",async (data)=>{
    try{
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        
        toast.promise(response,{
            loading:"deleting couse lectures",
            success:"Lectures deleted successfully",
            error:"Failed to delete the lectures"
        })
        return (await reponse).data;

    }catch(error){
        toast.error(error?.response?.data?.message);
    }

} )






const lecturesSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getCourseLecture.fulfilled,(state, action)=>{
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            state.lectures = action?.payload?.course?.lectures;
        })
    }

})

export default lecturesSlice.reducer;