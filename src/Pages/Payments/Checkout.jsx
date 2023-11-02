import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { BiRupee } from "react-icons/bi"


    function Checkout(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpaykey = useSelector((state)=>state?.razorpay?.key);
    const subscription_id = useSelector((state)=>state?.razorpay?.subscription_id);
    
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id:"",
        razorpay_signature : ""
    }

    async function handleSubscription(e){
        e.preventDefault();
        if(!razorpaykey || !subscription_id){
            toast.error("Something went wrong");
            return;
        }
        const options = {
            prefill:{// agar tum chahte ho kuch data prefilled razorpay ke popup main toh tum usse yha dal sakte ho.
                email: userData.email,
                name: userData.fullName
            },
            key:razorpaykey,
            subscription_id:subscription_id,
            name:"Coursify pvt.Ltd.",
            description:"Subscription",
            theme:{color : "#F37254" } ,
            handler:async function(response){
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment Successfully")

                const res = await dispatch(verifyUserPayment(paymentDetails));
                (res?.payload?.success) ? navigate("/checkout/success") : navigate("/checkout/failed")
            }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load(){
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }
   

    useEffect(()=>{// jessse hi yee component load hoga for the very first time us time per hamme kuch kuch data load karke lana hai
       load();

    },[]);


    return (
        
        <HomeLayout>
            <form
            onSubmit={ handleSubscription }
            className="min-h-[90vh] flex items-center justify-center text-white "
            >
                <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative ">
                    <h1 className="bg-yellow-500 w-full absolute top-0 text-center py-4 text-size 2xl font-bold rounded-tl-lg rounded-tr-lg " > Subscription Bundle</h1>
                    <div className="space-y-5 px-4 text-center  ">
                        <p className="text-[17px]">
                         This purchase will allow you to access all available course of our platform for {""}
                         <span className="text-yellow-500 font-bold ">
                            <br />
                            1 Year duration
                         </span>
                         All the existing and new launched courses will also be available
                        </p>
                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                            <BiRupee/>
                            <span>499</span>only
                        </p>
                        <div className="text-gray-200 v">
                            <p>100% Refund on cancellation</p>
                            <p>Terms and conditions applied *</p>
                        </div>
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600  transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                            Buy Now
                        </button>

                    </div>

                </div>
            </form>
        </HomeLayout>
     
    )

  }
    export default Checkout;

