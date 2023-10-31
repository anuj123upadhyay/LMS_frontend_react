import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance"



const initialState = {
    isloogedIn:localStorage.getItem('isLoggedIn') || false,
   role: localStorage.getItem('role') || "",
   data:localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
};

// creating async thunk //thunk is basically a async block of code that is used to performe delayed work//
//yee async thunk bangya hai hamare pass toh asyncThink kya kaam karega :-yee action ki taraha kaam karega, lekin yee action pehle apne app hi iska promise resolve hoga aur uske  baad yee action dipatch hoga apne data ke sath.
export const createAccount = createAsyncThunk("/auth/signup",async (data) => {
    try{
        const res = axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:"Wait! creating your account",
            success:(data)=>{
                return data?. data?.message
            },
            error:"failed to create account"
        });
        return (await res).data

    }catch(error){
        toast.error(error?.response?.result?.message);
    }
})

//  craeting login



export const login = createAsyncThunk("/auth/login",async (data) => {
    try{
        const res = axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading:"Wait! authenticating in process ...",
            success:(data)=>{
                return data?. data?.message
            },
            error:"failed to Login "
        });
        return (await res).data

    }catch(error){
        toast.error(error?.response?.result?.message);
    }
});
// creating logout

export const logout = createAsyncThunk("/auth/logout", async()=>{
    try{
        const res = axiosInstance.post("user/logout");
        toast.promise(res,{
            loading:"Wait! logout in process ...",
            success:(data)=>{
                return data?. data?.message
            },
            error:"failed to Logout "
        });
        return (await res).data

        
    }catch(error){
        toast.error(error?.response?.result?.message);
    }
})

// update profile
  //createAsyncThunk main hum sirf ek parameter pass kar sakte hain
  // asuncthunk is used to for api request

export const updateProfile = createAsyncThunk("/user/update/profile", async(data)=>{
    try{
        const res = axiosInstance.put(`user/update/${data[0]}`,data[1]);
        toast.promise(res,{
            loading:"Wait! profile update in process ...",
            success:(data)=>{
                return data?. data?.message
            },
            error:"failed to update profile "
        });
        return (await res).data

        
    }catch(error){
        toast.error(error?.response?.result?.message);
    }
})
// getUserdata thunk part of profile update
export const getUserData = createAsyncThunk("/user/details", async()=>{
    try{
        const res = axiosInstance.get("user/me");
       
        return (await res).data
        

        
    }catch(error){
        toast.error(error.message);
    }
})


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isloogedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear;
            state.data= {}
            state.isloogedIn = false
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isloogedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;

        })
    }
});


export const {} = authSlice.actions;
export default authSlice.reducer;