import { Link, Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { currentUser, logOut } from "../redux/features/Auth/AuthSlice";
import { useGetUserQuery } from "../redux/features/Users/UserApi";


const DashBoardLayout = () => {
  const user  = useAppSelector(currentUser) 
  const {role} = user 
  const dispatch = useAppDispatch()
  const {data} = useGetUserQuery()
  const handleLogout = () => {
    dispatch(logOut())
}
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
            <li><Link to='/dashboard/admin/allCar'>All Cars</Link></li>
          </ul>
        </details>
      </li>
        <li>
        <details>
          <summary>Manage Booking</summary>
          <ul className="p-2">
            <li><Link to='/dashboard/admin/add-Car'>Add Booking</Link></li>
          </ul>
        </details>
      </li>
    </>
  }

 

  
  
  </>

  const navbarItems = <>
  {user&& <>
      <li><Link to="/">Home</Link></li>
      
    
    </>}
    {user? <li><button onClick={handleLogout}>LogOut <span>{data?.data?.name}</span></button></li>:<li><Link to='/login'>Login</Link></li>}
  </>
  return (
        <div>
            
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
      <div className="divider"></div>
      <ul>
        {navbarItems}
      </ul>
    </ul>
   
  </div>
</div>  
        </div>
    );
};

export default DashBoardLayout;