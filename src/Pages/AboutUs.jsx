import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage  from "../assets/Images/aboutMainimage.png"
import apj from "../assets/Images/QuotesPersonalityImage/apj.png"
import billGates from "../assets/Images/QuotesPersonalityImage/billGates.png"
import einstein from "../assets/Images/QuotesPersonalityImage/einstein.png"
import nelsonMandela from "../assets/Images/QuotesPersonalityImage/nelsonMandela.png"
import steveJobs from "../assets/Images/QuotesPersonalityImage/steveJobs.png"
import CarouselSlide from "../components/CarouselSlide";

function AboutUs(){

    const celebrities = [
        {
            title:"Nelson Mandela",
            description:"Education is the most powerful tool you can use to chnage your life",
            image:nelsonMandela,
            slideNumber:1
        },
        {
            title:"APJ",
            description:"Education is the most powerful tool you can use to chnage your life",
            image:apj,
            slideNumber:2
        },
        {
            title:"Bill Gates",
            description:"Education is the most powerful tool you can use to chnage your life",
            image:billGates,
            slideNumber:3
        },
        {
            title:"Albert Einstein",
            description:"Education is the most powerful tool you can use to chnage your life",
            image:einstein,
            slideNumber:4
        },
        {
            title:"Steve jobs",
            description:"Education is the most powerful tool you can use to chnage your life",
            image:steveJobs,
            slideNumber:5
        }
    ]
    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10 ">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable And Quality Education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education to the world.We are providing the platform for the aspiring teachers and students to share their skills ,creativity and knowledge to emower and contribute  int he growth and wellness of mankind.
                        </p>

                    </section>
                    <div className="w-1/2">
                        <img src={aboutMainImage} className="drop-shadow-3xl" id="test1" style={{
                            filter:"drop-shadow(0 10px 10px rgb(0, 0, 0)) "
                        }} alt="aboutMainImage"/>
                    </div>
                </div>

            </div>

            <div className="carousel  w-1/2  my-16  m-auto  ">
                {celebrities && celebrities.map(celebrity =>(<CarouselSlide
                                                                {...celebrity}
                                                                 key={celebrity.slideNumber} totalSlides={celebrities.length}/>))}
                <CarouselSlide/>
            
            </div>

        </HomeLayout>
    )

}

export default AboutUs;