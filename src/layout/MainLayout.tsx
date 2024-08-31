import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";


const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <div className="container mx-auto min-h-screen my-5">
        <Outlet/>
        </div>
        <Footer/>
        </>
    );
};

export default MainLayout;