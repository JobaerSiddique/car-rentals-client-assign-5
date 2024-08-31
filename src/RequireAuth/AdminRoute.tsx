import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { currentUser } from "../redux/features/Auth/AuthSlice";


const AdminProtectRoute = ({children}) => {
    const location = useLocation()
    const user = useAppSelector(currentUser)
    
    if(user?.role === "admin"){
        return children;
    }

    return <Navigate to="/login" state={{from:location}} replace/>
};

export default AdminProtectRoute;