import { jwtDecode } from "jwt-decode";
interface JwtPayload {
    role: 'user' | 'admin'; 
  }

  export const verifyToken = (token: string): JwtPayload => {
    return jwtDecode<JwtPayload>(token);
  };