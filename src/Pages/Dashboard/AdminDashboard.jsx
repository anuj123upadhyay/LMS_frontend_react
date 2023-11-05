import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { Chart as ChartJs, ArcElement , Tooltip, Legend , CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllCouses } from "../../Redux/Slices/CouresSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie}  from "react-chartjs-2"
import { FaUsers } from "react-icons/fa"
import { FcSalesPerformance } from "react-icons/fc"
import { GiMoneyStack } from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJs.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)// kon konse chart tumhe dikhane hai
function AdminDashboard(){
    const dispatch  = useDispatch();
    const navigate = useNavigate();

    const { allUsersCount, subscribedCount} = useSelector((state) => state.stat);

    const {  allPayments,  monthlySalesRecord} = useSelector((state) => state.razorpay);

     const userData = {
        label:["registered User" , "Enrolled User" ],
        datasets:[
            {
                label:"User Details",
                data:[allUsersCount, subscribedCount],
                backgroundColor:["yellow", "green"],
                borderwidth:1,
                borderColor:["yellow" , "green"]
            }
        ]
     };

     const salesData = {
        label:[" Jan" , "Feb","Mar","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec" ],
        fontColor:"white",

        datasets:[
            {
                label:"Sales / Month",
                data:monthlySalesRecord,
                backgroundColor:["red"],
                borderwidth:2,
                borderColor:["white"]
            }
        ]
     }

     const myCourses = useSelector((state)=> state?.courseData);
     async function OnCourseDelete(id){
        if(window.confirm("Are You Sure To Want to Delete this Course")){
            const res = await dispatch(deleteCourse(id));
            if(res?.payload?.success){
                await dispatch(getAllCourses());
            }
        }
     }

    useEffect(()=>{
        (//  effee
            async ()=>{
                await dispatch(getAllCouses());
                await dispatch(getStatsData());
                await dispatch(getPaymentRecord());
            }
        )()
    },[])

    


    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white ">
                <h1 className=" text-center text-5xl font-semibold text-yellow-500 ">
                    Admin dashboard
                </h1>
                <div className="grid grid-cols-2 gap-5 m-auto mx-10  ">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-[0_0_10px_black]  rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData} />

                        </div>
                        <div className="grid grid-cols-2 gap-5 ">
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold  ">Registered Users </p>
                                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>

                                </div>
                                <FaUsers className="text-yellow-500 text-5xl  "/>
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold  ">Subscribed Users </p>
                                    <h3 className="text-4xl font-bold">{subscribedCount}</h3>

                                </div>
                                <FaUsers className="text-green-500 text-5xl  "/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10 p-5 shadow-[0_0_10px_black]  rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar data={salesData} className="absolute bottom-0 h-80 w-full"/>

                        </div>
                        <div className="grid grid-cols-2 gap-5">
                        <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold  ">Subscription Count </p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count}</h3>

                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl  "/>
                            </div>
                            <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-[0_0_10px_black]">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold  ">Total Revenue </p>
                                    <h3 className="text-4xl font-bold">{allPayments?.count = 499}</h3>

                                </div>
                                <GiMoneyStack className="text-green-500 text-5xl  "/>
                            </div>
                        

                        </div>

                    </div>


                </div>
                <div className=" mx-[10%] w-[80%] self-center flex flex-col items-center justify-center mb-10 ">
                    <div className="flex w-full items-center justify-between ">
                        <h1 className="text-center font-3xl font-semibold ">
                            courses overview 

                        </h1>
                        <button onClick={()=>{
                            navigate("/course/create")
                        }} className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-2 font-semibold text-lg cursor-pointer ">
                            Create new course 

                        </button>

                    </div>
                    <table className="table overflow-x-scroll ">
                        <thead>
                            <tr>
                                <th>    S.No.</th>
                                <th>   Course Title</th>
                                <th> Course Category  </th>
                                <th>  Instructor </th>
                                <th> Total Lecture  </th>
                                <th> Description  </th>
                                <th> Actions  </th>
                                 
                               
                            </tr>
                        </thead>
                        <tbody>
                            {myCourses?.map((course,idx)=>{
                                return (
                                    <tr key={course._id}>
                                        <td>{idx +1}</td>
                                        <td>
                                            <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none"></textarea>
                                        </td>
                                        <td>{course?.category}</td>
                                        <td>{course?.createdBy}</td>
                                        <td>{course?.numberOfLectures}</td>
                                        <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                            <textarea
                                            value={course?.description}
                                            readOnly
                                            className="w-80 h-auto bg-transparent resize-none"
                                             >

                                            </textarea>
                                        </td>
                                        <td className="flex items-center gap-4 ">
                                            <button onClick={()=> navigate("/course/displaylectures",{state:{...course}})}
                                            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold" >
                                                <BsCollectionPlayFill />

                                            </button>

                                            <button onClick={()=> OnCourseDelete(course?._id)}
                                            className="bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold" >
                                                <BsTrash />

                                            </button>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                </div>
            </div>
        </HomeLayout>
    )

}

export default AdminDashboard;