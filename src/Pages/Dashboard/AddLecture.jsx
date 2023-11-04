import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture(){
    const courseDetails = useLocation().state;
    const navigate = useNavigate();
    const [userInput,setUserInput] = useState({
        id:courseDetails._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    });

    function handleInputchange(e){
        const {name,value} = e.target 
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function handleVideo(e){
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);// one of the way of reading video as base64 url
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc:source
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.lecture || !UserInput.title || !userInput.description ){
            toast.error("All fields are mandatory");
            return;
        }

        const response = await dispatch(addCourseLeture(userInput) );
        if(response ?. payload?. success){
            navigate(-1)
            setUserInput({
                id:courseDetails._id,
                lecture:undefined,
                title:"",
                description:"",
                videoSrc:""

            })
        }
       
    }

    useEffect(()=>{
        if(!courseDetails){
            navigate("/courses");
        }
    },[])


    const dispatch = useDispatch();

    return (
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-centergap-10 mx-16 ">
             <div className="flex flex-col gap-5 p-2 shadoe-[0_0_10px_black] w-96 rounded-lg ">
                <header className="flex items-center justify-center relative">
                    <button>
                        <AiOutlineArrowLeft className="absolute left-2 text-xl text-green-500" onClick={()=> navigate(-1)} />
                    </button>
                    <h1 className="text-xl text-yellow-500 font-semibold">Add New Lecture</h1>
                </header>
                <form 
                onSubmit={ onFormSubmit }
                className="flex flex-col gap-3 "

                >
                    <input 
                    name="title"
                    placeholder="Enter the Title of Lecture"
                    onChange={handleInputchange}
                    type="text"
                    className="bg-transparent px-3 py-1 boredr"
                    value={userInput.title}
                     />

                     <textarea
                      name="description"
                      placeholder="Enter the description of Lecture"
                      onChange={handleInputchange}
                      type="text"
                      className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                      value={userInput.description}
                      
                     
                     />
                     {userInput.videoSrc ? (
                        <video
                         src={userInput.videoSrc} 
                         muted 
                         controlsList="nodownload nofullscreen"
                         disablePictureInPicture
                         className="object-fill rounded-tl-lg rounded-tr-lg w-full"

                          ></video>
                     ):
                     (
                        <div className="h-48 border flex items-center justify-center cursor-pointer ">
                            <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">choose your video</label>
                            <input 
                            type="file" 
                            className="hidden"
                            name="lecture"
                            id="lecture"
                            onChange={handleVideo}
                            accept="video/mp4 video/x-mp4 video/*"
                            />
                        </div>
                     )}
                     <button type="submit" className="btn-primary py-1 font-semibold text-lg ">
                        Add New Lecture
                     </button>

                     
                </form>
             </div>
            </div>
        </HomeLayout>


    )

}

export default AddLecture;