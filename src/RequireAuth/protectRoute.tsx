import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { currentUser } from "../redux/features/Auth/AuthSlice";
import { ReactNode } from "react";

interface ProtectRouteProps {
    children: ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    const location = useLocation();
    const user = useAppSelector(currentUser);

    if (user) {
        return <>{children}</>;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectRoute;
