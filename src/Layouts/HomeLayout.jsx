import {FiMenu} from 'react-icons/fi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import Footer from '../components/footer'






function HomeLayout({children}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

// for checking if user is logged in 
const isLoggedIn = useSelector((state)=> state?. auth ?. isLoggedIn)//stae null nahi hai toh auth prsent hai auth null nahi hai toh isLogged in present hoga.

// for dispalying the options acc. to role
const role = useSelector((state)=>state?. auth?. role);//lecture name "adding sidebar buttons on sidebar"

    function changeWidth() {
        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width='auto' 
        
    }
    function hideDrawer() {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width=0;
    
       
    }
    function handleLogout(e) {
        e.preventDefault();

        // const res = await dispatch(logout());
        // if(res?. payload?.success) AGAR RESULT KE PAYLOAD MAIN SUCCESS AARAHA Hoga US CASE MAIN HUM LOGOUT KER DENGE
        navigate('/')
        
    }

    return(
    <div className="min-h-[90vh">
        <div className="drawer absolute left-0 z-50 w-fit">
            <input type="checkbox"  id="my-drawer" className="drawer-toggle"/>
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="cursor-pointer relative">
                  <FiMenu
                  onClick={changeWidth}
                  size={'32px'}
                  className="font-bold text-white m-4"
                  /> 
                </label>
            </div>
            <div className="drawer-side w-0">
            <label htmlFor="my-drawer"  className="drawer-overlay">
                <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative" >
                    <li className='w-fit absolute  right-2 z-50'>
                        <button onClick={hideDrawer}>
                            <AiFillCloseCircle size={24}/>
                        </button>
                    </li>

                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {isLoggedIn && role ==="ADMIN" && (
                        <li>
                            <Link to="/admin/dashboard">Admin Dashboard</Link>
                        </li>
                    )}

                    <li>
                        <Link to='/courses'>All Courses</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    <li>
                        <Link to='/about'>About Us</Link>
                    </li>

                    {!isLoggedIn && (
                        <li className='absolute bottom-4 w-[90%]'>
                        <div className='w-full flex items-center justify-center '>
                            <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                                <Link to="/login">Login</Link>
                            </button>

                            <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                <Link to="/signup">SignUp</Link>
                            </button>
                        </div>
                        </li>
                    )}

{isLoggedIn && (
                        <li className='absolute bottom-4 w-[90%]'>
                        <div className='w-full flex items-center justify-center '>
                            <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                                <Link to="/user/profile">Profile</Link>
                            </button>

                            <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                <Link to={handleLogout}>LogOut</Link>
                            </button>
                        </div>
                        </li>
                    )}
                </ul>
            </label>
            </div>
        </div>

        {children}


    <Footer/>
    </div>
    )
}

export default HomeLayout;