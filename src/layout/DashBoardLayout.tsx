// @ts-ignore
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { currentUser, logOut } from "../redux/features/Auth/AuthSlice";
import { useGetUserQuery } from "../redux/features/Users/UserApi";
import { useEffect, useState } from "react";


interface User {
  role: 'user' | 'admin';
 
}


const DashBoardLayout = () => {
  const user = useAppSelector(currentUser) as User | null;
 
  const dispatch = useAppDispatch()
  const [theme, setTheme] = useState('light');
  const {data} = useGetUserQuery()
  const handleLogout = () => {
    dispatch(logOut())
}

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  document.body.classList.toggle('dark', newTheme === 'dark');
};

useEffect(() => {
  const storedTheme = localStorage.getItem('theme');
  const preferredTheme = storedTheme || 'light';
  setTheme(preferredTheme);
  document.documentElement.setAttribute('data-theme', preferredTheme);
  document.body.classList.toggle('dark', preferredTheme === 'dark');
}, []);


useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);

const role = user?.role;
  const menuItem = <>
  {
    role === "user" &&<>
       <li><Link to='/dashboard/users'>My- Profile</Link></li>
      
     
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
            <li><Link to='/dashboard/paymentHistory'>Payment History</Link></li>
          </ul>
        </details>
      </li>
    </>
  }
  {
    role === "admin" &&<>
     <li><Link to='/dashboard/users'>My- Profile</Link></li>
     <li><Link to='/dashboard/admin/reports'>Booking Reports</Link></li>
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
            <li><Link to='/dashboard/admin/allBookings'>All Booking</Link></li>
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
    <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />

          {/* sun icon */}
          <svg
            className="swap-on h-8 w-8 fill-current mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off h-8 w-8 fill-current mx-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
  </>
  return (
        <div>
             <label htmlFor="my-drawer-2" className="btn btn-ghost  drawer-button lg:hidden">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
    </label>
          <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content  p-8">
    {/* Page content here */}
    <Outlet/>
  </div>
  <div className="drawer-side dark:text-white ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu font-bold  dark:text-white lg:bg-cyan-500  light:text-base-content min-h-full w-80 p-4  dark:bg-black">
      {/* Sidebar content here */}
   
      
      {menuItem}
      <div className="divider divider-neutral"></div>
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