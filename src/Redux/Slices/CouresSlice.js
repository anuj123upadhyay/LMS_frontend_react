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


export const createNewCourse = createAsyncThunk("/course/create",async (data)=>{
    try{
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdby", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/courses",formData);
        toast.promise(response,{
            loading:"Creating new course",
            success:"Course created succcessfully",
            error:"Failed to create course"
        })
        return(await response).data
    }catch(e){
        toast.error(error?.response?.data?.message)    
    }
   
})


export const deleteCourse = createAsyncThunk("/course/delete",async (id)=>{// ek prakar se action hota hai jisse dispatch method ke jareie dispatch kiya jata hai.
    try{
        const response = axiosInstance.delete(`/couses/${id}`);
        toast.promise(response ,{
            loading:"deleting course  .. ",
            success:"Courses deleted successfully",
            error:"Failed to delete the courses",
        });
        return (await response).data;
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