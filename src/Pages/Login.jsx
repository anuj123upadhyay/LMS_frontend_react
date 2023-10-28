import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// importing taosts from react-hot-toast
import {toast} from "react-hot-toast"
import { login } from "../Redux/Slices/AuthSlice";

function Login(){

    const dispatch = useDispatch()
    const navigate = useNavigate()



const [loginData, setLoginData] = useState({
    email:'',
    password:"",
});
    
    


function handleUserInput(e)  {
    const {name,value} = e.target;
    setLoginData({
        ...loginData,
        [name]:value
    })

};



 async function onLogin(event){
    event.preventDefault();
    // react hot toast implementation// toast from retact hot toast
    if(!loginData.email ||!loginData.password  ){
        toast.error("Please fill All the details");
        return;
    }



    // dispatch create Account action
    const  response = await dispatch(login(loginData))
    if(response?.payload?.success)
      navigate("/");
    


    setLoginData({
        email:'',
        password:""
    });
     
    
}

    return (
       <HomeLayout>
            <div className="flex  items-center justify-center h-[100vh]">
                <form  onSubmit={onLogin}  className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" noValidate >
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    
                    
                     <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input 
                            type="email"
                            required
                            name="email"
                            value={loginData.email}
                            id="email" 
                            placeholder="Enter your email here"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                         />
                        </div>
                        <div  className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                            type="password"
                            required
                            name="password"
                            value={loginData.password}
                            id="password" 
                            placeholder="Enter your password here"
                            className="bg-transparent px-2 py-1 border w-full"
                            onChange={handleUserInput}
                         />
                    
                        </div>
                     <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-200 rounded-sm py-1 mt-2 font-semibold cursor-pointer text-lg">
                       Login
                     </button>

                     <p className="text-center ">Don't have an account? <Link to="/signup" className="link text-accent cursor-pointer">SignUp</Link></p>
                     
                </form>
            </div>

       </HomeLayout>
    )

}

export default Login;
                    

                       

   



