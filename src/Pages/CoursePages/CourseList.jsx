import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCouses } from "../../Redux/Slices/CouresSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../components/CourseCard";

function CourseList() {
    const dispatch = useDispatch()
    

    const {courseData} = useSelector((state)=> state.course);

   async function loadCourses(){
        await dispatch(getAllCouses());
    }

    useEffect(()=>{//componenet ke first load per sare ke sare courseData ko load karne ki kosiskarega 
        loadCourses();

    },[]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-20 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5">
                    Explore the Courses made by
                    <span className="font-bold text-yellow-600">Industry expert</span>
                    </h1>
                    <div className="mb-10 flex flex-wrap gap-14">
                        // rendering  cards of courses//
                        {courseData ?. map((element)=>{
                            return <CourseCard key={element._id} data={element}/>
                        })}

                    </div>
                

            </div>

        </HomeLayout>
    )
    
}

export default CourseList;