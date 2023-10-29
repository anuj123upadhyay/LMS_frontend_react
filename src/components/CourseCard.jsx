import { useNavigate } from "react-router-dom";

function CourseCard(){
    const navigate = useNavigate();

//naviagte method also take an object as given below which is used to send data on the given "/course/description page" and can access by using """""""""useLocation""""""""" hook on that page on which data has to be sent.yaani ki '/course/description'  wale page per
    return (
     <div>
        onClick={()=>navigate("/course/description", {state: {...data}})} 
        <div className="text-white w-[22rem] h-[43px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700">
            <div className="overflow-hidden">
                <img 
                className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300"
                src={data?.thumbnail?.secure_url}
                alt="course thumbnail"
                />
                <div className="p-3 space-y-1 text-white ">
                    <h2 className="text-xl font-bold text-yellow-600 line-clamp-2">
                        {data?.title}

                    </h2>
                    <p className="line-clamp-2">
                        {data?.description}
                    </p>
                    <p className="font-semibold ">
                        <span className="text-yellow-500 font-bold">Category:</span>
                        {data?.category}
                    </p>
                   
                    <p className="font-semibold ">
                        <span className="text-yellow-500 font-bold">Total Lectures :</span>
                        {data?.numberoflectures}
                    </p>
                    <p className="font-semibold ">
                        <span className="text-yellow-500 font-bold">Instructor :</span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
            
        </div>
    </div>

    )
}

export default CourseCard;