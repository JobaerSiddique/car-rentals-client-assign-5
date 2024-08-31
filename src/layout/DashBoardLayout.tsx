import { Link, Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import { useAppSelector } from "../redux/hook";
import { currentUser } from "../redux/features/Auth/AuthSlice";


const DashBoardLayout = () => {
  const user  = useAppSelector(currentUser) 
  const {role} = user 
  const menuItem = <>
  {
    role === "user" &&<>
       <li><Link to='/dashboard/users'>My- Profile</Link></li>
      <li><a>Sidebar Item 2</a></li>
     
        <li>
        <details>
          <summary>Booking Management</summary>
          <ul className="p-2">
            <li><Link to='/dashboard/my-booking'>My-Booking</Link></li>
          
          </ul>
        </details>
      </li>
        <li>
        <details>
          <summary>Payment Management</summary>
          <ul className="p-2">
           
            <li><Link to='/dashboard/paymentInfo'>Payment</Link></li>
          </ul>
        </details>
      </li>
    </>
  }
  {
    role === "admin" &&<>
   
      <li><Link to ="/dashboard/admin/bookingSummery">Booking-Summery</Link></li>
      <li><Link to ="/dashboard/admin/allUser">All Users</Link></li>
     
        <li>
        <details>
          <summary>Manage Cars</summary>
          <ul className="p-2">
            <li><Link to='/dashboard/admin/add-Car'>Add Cars</Link></li>
            <li><a>All Cars</a></li>
          </ul>
        </details>
      </li>
    </>
  }
  
  </>
  return (
        <div>
            <Navbar/>
          <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content  p-8">
    {/* Page content here */}
    <Outlet/>
  </div>
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu font-bold bg-gray-200 lg:bg-cyan-500 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
   
      
      {menuItem}
    </ul>
  </div>
</div>  
        </div>
    );
};

export default DashBoardLayout;