import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture, getCourseLecture } from "../../Redux/Slices/LecturesSlice";

function DisplayLectures(){
    const {state} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {lectures} = useSelector((state)=> state.lecture);
    const {role} = useSelector((state)=> state.auth);

    const [currentVideo, setCurrentVideo]= useState();


     async function onLectureDelete(courseId,lectureId){
        await dispatch(deleteCourseLecture({courseId : courseId, lectureId :lectureId}));
        await dispatch(getCourseLecture(courseId))

    }

    useEffect(()=>{
        if(!state){
            navigate("/couses")
        }
        dispatch(getCourseLecture(state._id))
    },[]);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%] ">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name

                </div>
                
                { (lectures &&  lectures.length>0)
                 ? ( <div className="flex flex-row justify-center gap-10 w-full">
                    {/* left section for playing videos  And displaying course details to ADMIN*/}
                   <div className="space-y-5 w-{30rem} p-2 rounded-lg shadow-[0_0_10px_black]">
                    <video 
                    src={lectures && lectures[currentVideo]?.lecture?.secure_url }
                    className="object-fill rounded-tl-lg rounded-tr-lg w-full controls"
                    controls
                    disablePictureInPicture
                    muted
                    controlsList="nodownload"
                    >

                        
                    </video>
                    <div>
                        <h1>
                            <span className="text-yellow-500 " > 
                            Title:{" "}
                               
                            </span>
                            { lectures &&  lectures[currentVideo]?.title}
                        </h1>
                        <p>
                            <span className="text-yellow-500 line-clamp-4">
                                Description: {" "}
                            </span>
                            {lectures && lectures[currentVideo]?.description}
                        </p>
                    </div>
                   </div>


                   {/* right section for dislaying list of lecturs */}

                   <ul className="w-28 p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 ">
                    <li className="font-semibod text-xl text-yellow-500 flex items-center justify-between">
                        <p>
                            Lectures List
                        </p>
                        { role === "ADMIN"  && (
                           <button onClick={()=>navigate("/course/addlecture", {state: {...state }})} className="btn-primary px-1 py-1 rounded-md font-semibold text-sm">
                            Add New Lecture
                           </button>

                        )}
                    
                    </li>
                    {lectures &&
                     lectures.map((lecture,idx)=>{
                        return (
                            <li key={lecture._id} className="space-y-2   " >
                                <p className="cursor-pointer" onClick={()=> setCurrentVideo(idx)}>
                                    <span>
                                        {" "} Lecture {idx + 1}:{" "}
                                    </span>
                                    {lecture?.title}

                                </p>
                                { role === "ADMIN" && (
                                    <button onClick={ ()=> onLectureDelete(state?._id,lecture?._id) } className="btn-accent px-1 py-1 rounded-md font-semibold text-sm">
                                   Delete Lecture
                                   </button>
                                )}
                            </li>
                        )
                     })
                     }
                   </ul>
                </div>) :(
                     role && role === "ADMIN"  && (
                        <button onClick={()=>navigate("/course/addlecture", {state: {...state }})} className="btn-primary px-1 py-1 rounded-md font-semibold text-sm">
                         Add New Lecture
                        </button>

                     )
                )})

            </div>

        </HomeLayout>
    )
}

export default DisplayLectures;