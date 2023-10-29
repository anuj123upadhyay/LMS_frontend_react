import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";

function Contact(){

    const [userInput,setuserInput] = useState({
        name:"",
        email:"",
        message:""
    })

    function handleInputChange(e){
        const {name,value}= e.target;
        setuserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.message || !userInput.name  ){
            toast.error("All Fields are required")
            return;
        }
        if(!isEmail(userInput.email)){
            toast.error("Invalid email id")
            return;
          }
          //api calling

          try{
                const response = axiosInstance("/contact",userInput)
                toast.promise(res,{
                    loading:"Submitting your message",
                    success:"Form submitted successfully",
                    error:"Failed to submit the form"
                });
                const contactResponse = await response;
                if(contactResponse?.data?.success){
                    setuserInput({
                        name:"",
                        email:"",
                        message:""
                    })
                }
          }catch(error){
            toast.error("operation failed ...")
             
          }
        
    }



    return(
       <HomeLayout> 
       <div className="flex items-center justify-center  h-[100vh]">
       <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0px_0px_10px_black] w-[22rem] ">
            <h1 className="text-3xl font-semibold">
                Contact Form
            </h1>
            <div className="flex flex-col w-full gap-1">
                <label htmlFor="name" className="text-lg font-semibold">
                    Name
                </label>
                <input 
                 type="text"
                 className="bg-transparent border px-2 py-1 rounded-sm" 
                 id="name"
                 name="name"
                 placeholder="Enter your name"
                 onChange={handleInputChange}
                 value={userInput.name}
                 />
                 
            </div>

            <div className="flex flex-col w-full gap-1">
                <label htmlFor="email" className="text-lg font-semibold">
                    Email
                </label>
                <input 
                 type="email"
                 className="bg-transparent border px-2 py-1 rounded-sm" 
                 id="email"
                 name="email"
                 placeholder="Enter your email"
                 onChange={handleInputChange}
                 value={userInput.email}
                 />
                 
            </div>

            <div className="flex flex-col w-full gap-1">
                <label htmlFor="message" className="text-lg font-semibold">
                    Message
                </label>
                <textarea 
                 
                 className="bg-transparent border px-2 py-1 rounded-sm resize-noneh-40" 
                 id="message"
                 name="message"
                 placeholder="Enter your message"
                 onChange={handleInputChange}
                 value={userInput.message}
                 />
                 
            </div>

            <button type="submit" 
            className="w-full bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-200 py-2 font-semibold text-lg cursor-pointer rounded-sm"
            >
                 Submit
            </button>
        </form>
        </div>

       </HomeLayout>
    )

}
export default Contact;