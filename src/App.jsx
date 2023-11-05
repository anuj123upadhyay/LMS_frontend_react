import { Route,Routes } from 'react-router-dom'
import './App.css'

import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/CoursePages/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/CoursePages/CourseDescription'
import RequireAuth from './components/Auth/RequireAuth'
import CreateCourse from './Pages/CoursePages/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payments/Checkout'
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess'
import CheckoutFailure from './Pages/Payments/CheckoutFailure'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import AddLecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'

function App() {

    return (
    <>
     
       <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
       
       
        <Route path='/courses' element={<CourseList/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/denied' element={<Denied/>}></Route>
        <Route path='/course/description' element={<CourseDescription/>}></Route>

        <Route  element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/course/create' element={<CreateCourse/>}></Route>
          <Route path='/course/addlecture' element={<AddLecture/>}></Route>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
        </Route>

        <Route  element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
        <Route path='/user/profile' element={<Profile/>}></Route>
        <Route path='/user/editprofile' element={<EditProfile/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/checkout/success' element={<CheckoutSuccess/>}></Route>
        <Route path='/checkout/fail' element={<CheckoutFailure/>}></Route>
        <Route path='/course/displaylecture' element={<DisplayLectures/>}></Route>

        </Route>
        
        <Route path='*' element={<NotFound/>}></Route>
        

       </Routes>
   
    </>
  )
}

export default App




