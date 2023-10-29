import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// importing taosts from react-hot-toast
import {toast} from "react-hot-toast"
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

function Signup(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

const [previewImage, setPreViewImage] = useState("");

const [signupData, setSignupData] = useState({
    fullName:"",
    email:'',
    password:"",
    avatar:""

});

function handleUserInput(e)  {
    const {name,value} = e.target;
    setSignupData({
        ...signupData,
        [name]:value
    })

};

function getImage(event){
    event.preventDefault();
        //getting the image
    const uploadedImage = event.target.files[0];

    if(uploadedImage){
        setSignupData({
            ...signupData,
            avatar:uploadedImage
        });
        const fileReader = new FileReader()
        FileReader.readAsDataUrl(uploadedImage)
        fileReader.addEventListener("loud",function(){
            setPreViewImage(this.result);
    })
    }


} 

 async function createNewAccount(event){
    event.preventDefault();
    // react hot toast implementation// toast from retact hot toast
    if(!signupData.email ||!signupData.password || !signupData.fullName  || !signupData.avatar){
        toast.error("Please fill All the details");
        return;
    }

    // checking name field length
    if(signupData.fullName.length<5){
        toast.error("Name should be atleast of 5 characters")
        return;
    }
    // checking valid email  using regex
    if(!isEmail(!signupData.email)){
        toast.error("Invalid email id")
        return;
      }
    //   checking password validation using regex
    if(!isValidPassword(!signupData.password)){
        toast.error("Password should be 8-20 characters long,At least one uppercase characte ,At least one lowercase characte,At least one digit,At least one special character")
        return;
    }

    const formData = new FormData();
    formData.append("fullName",signupData.fullName);
    formData.append("email",signupData.email);
    formData.append("password",signupData.passowrd);
    formData.append("avatar",signupData.avatar);

    // dispatch create Account action
    const  response = await dispatch(createAccount(formData))
    if(response?.payload?.success)
      navigate("/");
    


    setSignupData({
     fullName:"",
    email:'',
    password:"",
    avatar:""

    });
    setPreviewImage("");



}

    return (
       <HomeLayout>
            <div className="flex  items-center justify-center h-[100vh]">
                <form  onSubmit={createNewAccount}  className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" noValidate >
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_upload" className="cursor-pointer">
                        { previewImage ? (
                            <img  src={previewImage} className="w-24 h-24 rounded-full m-auto " />
                        ):(
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )
                    }
                    </label>
                    <input 
                    className="hidden" 
                    type="file"
                    id="image_uploads" 
                    name="image-uploads"
                    accept=".jpg, .jpeg, .png, .svg"
                    onChange={getImage}
                    />
                    
                    

                        <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input 
                            type="text"
                            required
                            name="fullName"
                            value={signupData.fullName}
                            id="fullName" 
                            placeholder="Enter your fullName here"
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                         />
                        </div>

                     <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input 
                            type="email"
                            required
                            name="email"
                            value={signupData.email}
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
                            value={signupData.password}
                            id="password" 
                            placeholder="Enter your password here"
                            className="bg-transparent px-2 py-1 border w-full"
                            onChange={handleUserInput}
                         />
                    
                        </div>
                     <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-200 rounded-sm py-1 mt-2 font-semibold cursor-pointer text-lg">
                        Create Account
                     </button>

                     <p className="text-center ">Already have an account ? <Link to="/login" className="link text-accent cursor-pointer">Login</Link></p>
                     
                </form>
            </div>

       </HomeLayout>
    )

}

export default Signup;