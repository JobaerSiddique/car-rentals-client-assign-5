import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/Auth/AuthSlice";
import { useLoginMutation } from "../../redux/features/Auth/AuthApi";
import { verifyToken } from "../../utils/verfiyToken";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";


const Login = () => {
    const {register,formState: { errors },handleSubmit,reset} = useForm()
    const [login,{data,error,isLoading}] = useLoginMutation()
    const navigate = useNavigate()
   const dispatch = useAppDispatch()
    const onSubmit = async(data) => {
      const userInfo = {
        email:data.email,
        password:data.password,
      }
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken)
      dispatch(setUser({user:user,token:res.data.accessToken}))
      reset()
     if(user.role === 'user'){
      navigate('/dashboard/users')
      toast("user Login successful")
     }
     else if(user.role === 'admin'){
      navigate('/dashboard/admin/bookingSummery')
      toast("Admin Login successful")
     }
    };

    if(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `<span style="color: red;">${error?.data?.message}</span>`,
        
      });
      reset()
    }
    
    return (
      <div >
<div className="flex justify-center items-center min-h-screen rounded-3xl shadow-2xl" style={{ backgroundImage: "linear-gradient(to right, #667eea, #764ba2)" }}>
         <div className="card card-glass w-[70%] lg:w-[40%] shadow-2xl">
            <h1 className="text-center font-bold lg:text-4xl mt-24 text-orange-600">Login</h1>
  <div className="card-body">
  <form onSubmit={handleSubmit(onSubmit)} >
  <label className="form-control w-full my-4 ">
  <div className="label">
    <span className="label-text">Email</span>
    
  </div>
  <input 
  type="email" 
  placeholder="Enter your email address" 
  className="input input-bordered w-full "
  {...register("email", { required: {
    value: true,
    message: "Email is required"
  } })}
  />
  {errors.email?.type === "required" && (
        <p className="text-red-500 mt-3">{errors?.email?.message}</p>
      )}
</label>
  <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Password</span>
    
  </div>
  <input 
  type="password" 
  placeholder="Enter your password" 
  className="input input-bordered w-full max-w-full "
  {...register("password", { required:{
    value: true,
    message: "Password is required"
  },
  minLength:{
    value: 6,
    message: "Password must be at least 6 characters"
  },
  maxLength:{
    value: 6,
    message: "Password must be at least 6 characters"
  }
})}
  />
 {errors.password?.type === "required" && (
        <p className="text-red-500 mt-3">{errors?.password?.message}</p>
      )}
 {errors.password?.type === "minLength" && (
        <p className="text-red-500 mt-3">{errors?.password?.message}</p>
      )}
 {errors.password?.type === "maxLength" && (
        <p className="text-red-500 mt-3">{errors?.password?.message}</p>
      )}
</label>
<p className="hover:underline my-6 text-end hover:text-orange-600 hover:font bold"><Link to="/forget-Password">forget Password</Link></p>
<p className="my-3 font-bold">Are You New user? <span className="text-orange-500 hover:underline"><Link to="/signUp">Please Register</Link></span></p>
<input className="btn btn-primary w-full my-5" type="submit" value="Login" />
  </form>
  </div>
</div>
        </div>
      </div>
        
    );
};

export default Login;