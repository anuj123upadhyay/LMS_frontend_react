import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({allowedRoles}){

    const {isLoggedIn,role} = useSelector((state)=>state.auth)
    
    
    return isLoggedIn && allowedRoles.find((myRole)=>myRole == role)?(
        // requireAuth componenets main hum kuch children componenets add karenge aur agar humne authentication successfully kar liya toh hum logo ko boh components accessible ho jaenge
        <Outlet/>
    ): isLoggedIn ? (<Navigate to="/denied"  />):(<Navigate to="/login"/>)

}

export default RequireAuth;