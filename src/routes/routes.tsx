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
import AllCars from "../components/AdminManagement/CarManagement/AllCars";
import UserPaymentHistory from "../components/users/UserPaymentHistory";
import PaymentCancel from "../components/Payment/PaymentCancel";
import BookingPage from "../components/Bookings/BookingPage";
import BookNow from "../components/Bookings/BookNow";
import ConfirmBooking from "../components/Bookings/ConfirmBooking";
import Allbookings from "../components/Bookings/Allbookings";


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
            },
            {
                path:'booking',
                element:<ProtectRoute><BookingPage/></ProtectRoute>
            },
            {
                path:'bookNow/:id',
                element:<ProtectRoute><BookNow/></ProtectRoute>
            },
            {
                path:'confirmBook',
                element:<ProtectRoute><ConfirmBooking/></ProtectRoute>
            }
        ]
            
    },
    {
        path:'/dashboard',
        element:<ProtectRoute><DashBoardLayout/></ProtectRoute> ,
        children:[
            {
                index:true,
                element:<UsersInfo/>
            },
           
            {
                path:'/dashboard/my-booking',
                element: <Userbooking/>
            },
            {
                path:'/dashboard/users',
                element: <UsersInfo/>
            },
            {
                path:'/dashboard/paymentHistory',
                element: <UserPaymentHistory/>
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
                path:'/dashboard/payment/cancel/:id',
                element:<PaymentCancel/>
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
            },
            {
                path:'/dashboard/admin/allCar',
                element:<AdminProtectRoute><AllCars/></AdminProtectRoute>
            },
            {
                path:'/dashboard/admin/allBookings',
                element:<AdminProtectRoute><Allbookings/></AdminProtectRoute>
            }
        ]
    },
    
    
    
    
    {
        path:'*',
        element:<NotFound/>
    }
])


export default router;