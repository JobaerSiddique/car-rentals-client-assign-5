import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import AboutUs from "../pages/AboutUs";
import DashBoardLayout from "../layout/DashBoardLayout";
import ProtectRoute from "../RequireAuth/protectRoute";
import CarListing from "../pages/CarListing";
import SingleCarInfo from "../pages/SingleCarInfo";
import Userbooking from "../components/Bookings/Userbooking";
import UsersInfo from "../components/users/usersInfo";
import UserPayment from "../components/Payment/UserPayment";
import NotFound from "../pages/NotFound";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import PaymentFailed from "../components/Payment/PaymentFailed";
import PaymentInfo from "../components/Payment/PaymentInfo";
import AdminProtectRoute from "../RequireAuth/AdminRoute";
import AdminBookingSummery from "../components/AdminManagement/AdminBookingSummery";
import AddCar from "../components/AdminManagement/AddCar";
import AdminAllUser from "../components/AdminManagement/UserManagement/AdminAllUser";


const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'signUp',
                element:<SignUp/>
            },
            {
                path:'about-us',
                element:<AboutUs/>
            },
            {
                path:'carListing',
                element:<CarListing/>
            },
            {
                path:'carInfo/:id',
                element:<SingleCarInfo/>
            }
        ]
            
    },
    {
        path:'/dashboard',
        element:<ProtectRoute><DashBoardLayout/></ProtectRoute> ,
        children:[
            {
                path:'/dashboard/my-booking',
                element: <Userbooking/>
            },
            {
                path:'/dashboard/users',
                element: <UsersInfo/>
            },
            {
                path:'/dashboard/paymentInfo',
                element: <PaymentInfo/>
            },
            {
                path:'/dashboard/pay/:id',
                element: <UserPayment/>
            },
            {
                path:'/dashboard/payment/success/:id',
                element:<PaymentSuccess/>
            },
            {
                path:'/dashboard/payment/failed/:id',
                element:<PaymentFailed/>
            },
            {
                path:'/dashboard/admin/bookingSummery',
                element:<AdminProtectRoute><AdminBookingSummery/></AdminProtectRoute>
            },
            {
                path:'/dashboard/admin/add-Car',
                element:<AdminProtectRoute><AddCar/></AdminProtectRoute>
            },
            {
                path:'/dashboard/admin/allUser',
                element:<AdminProtectRoute><AdminAllUser/></AdminProtectRoute>
            }
        ]
    },
    
    
    
    
    {
        path:'*',
        element:<NotFound/>
    }
])


export default router;