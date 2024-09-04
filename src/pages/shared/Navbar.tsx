import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { currentUser, logOut } from "../../redux/features/Auth/AuthSlice";
import { useGetUserQuery } from "../../redux/features/Users/UserApi";


const Navbar = () => {
    const user = useAppSelector(currentUser)
    const dispatch = useAppDispatch()
  const {data} = useGetUserQuery()
  console.log(data);
    const handleLogout = () => {
        dispatch(logOut())
    }
    const menuItems  = <>
     <li><Link to="/">Home</Link></li>
     <li><Link to="/about-us">About Us</Link></li>
     
     <li><Link to="/carListing">CarListing</Link></li>
     <li><Link to="/">Contact</Link></li>
    {user&& <>
      <li><Link to="/">Booking</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
    
    </>}
    {user? <li><button onClick={handleLogout}>LogOut <span>{data?.data?.name}</span></button></li>:<li><Link to='/login'>Login</Link></li>}
    {user && <div className="avatar ">
  <div className="w-10 rounded-full">
    <img src={data?.data?.image} />
  </div>
</div>}
              
             

    </>
        
    
    
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
           
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
             {menuItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems}
          </ul>
        </div>
       <div className="navbar-end">
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
       </div>
      </div>
    );
};

export default Navbar;