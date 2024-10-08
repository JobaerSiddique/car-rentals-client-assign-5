import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


import { useRegisterMutation } from "../../redux/features/Auth/AuthApi";
import { toast } from "sonner";
import LoadingPage from "../shared/LoadingPage";
import { useState } from "react";


const SignUp = () => {
    const {register,formState: { errors },handleSubmit} = useForm()
   const [user,{isLoading,error}] = useRegisterMutation()
   const navigate = useNavigate()
   const cloudName = import.meta.env.VITE_CLOUD_NAME
const cloudPreset = import.meta.env.VITE_UPLOAD_PRESET
const [terms,setTerms] = useState(false)
    const onSubmit = (data) => {
        if(data.password !== data.confirmPassword){
            toast("password is incorrect")
        }
        const file = data.file ? data.file[0] : null;
        const formData = new FormData();
      
        if (file) {
          formData.append('file', file);
          formData.append('upload_preset', cloudPreset);
      
          fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
          })
          .then(res => res.json())
          .then(imageData => {
            const image = imageData.secure_url;
            const userInfo = {
                name:data.Name,
                email:data.email,
                password:data.password,
                confirmPassword:data.confirmPassword,
                phone:data.phone,
                image,
                address:data.address
            }
           
                const result =  user(userInfo).unwrap();
                console.log(result)
                toast("User Created Successfully")
                navigate('/login')
            
          
          })
       
      
    }
   
}
if(isLoading){
    return <LoadingPage/>
}
if (error) {
    let errorMessage = "An error occurred";

    
    if (typeof error === 'object' && error !== null) {
       
        if ('data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
            errorMessage = (error.data as { message?: string }).message || errorMessage;
        } 
        else if ('message' in error) {
            errorMessage = (error as { message?: string }).message || errorMessage;
        }
    }

    toast(errorMessage);
}
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <h1 className="text-3xl font-semibold dark:text-black">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="username_2" className="block font-medium">
                        Name
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        placeholder="Enter Your Name"
                        type="text"
                        {...register("Name", { required:{
                            value:true,
                            message:"Name must be Required"
                        }})}
                    />
                    {errors.Name?.type === "required" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.Name?.message)}</p>
      )}
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="password_2" className="block font-medium">
                        Email
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        placeholder="Enter Your Email"
                        type="email"
                        {...register("email", { required:{
                            value:true,
                            message:"Email must be Required"
                        }})}
                    />
                    {errors.email?.type === "required" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.email?.message)}</p>
      )}
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="password_2" className="block font-medium">
                        password
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        placeholder="Enter Your Password"
                        type="password"
                        {...register("password", { required:{
                            value:true,
                            message:"password must be Required"
                        }, maxLength:{
                            value:6,
                            message:"Password must be at least 6 characters "
                        },
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                          }
                    })}
                    />
                   {errors.password?.type === "required" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.password?.message)}</p>
      )}
      {errors.password?.type === "maxLength" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.password?.message)}</p>
      )}
      {errors.password?.type === " minLength" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.password?.message)}</p>
      )}
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="password_2" className="block font-medium">
                        Confirm-Password
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        placeholder="Enter Your confirm-password"
                        type="password"
                        {...register("confirmPassword", { required:{
                            value:true,
                            message:"confirmPassword must be Required"
                        }, maxLength:{
                            value:6,
                            message:"confirmPassword must be at least 6 characters "
                        }})}
                    />
        {errors.confirmPassword?.type === "required" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.confirmPassword?.message)}</p>
      )}
      {errors.confirmPassword?.type === "maxLength" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.confirmPassword?.message)}</p>
      )}
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="password_2" className="block font-medium">
                        Phone
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        placeholder="Enter Your Vaild Phone Number"
                        type="number"
                        {...register("phone", { required:{
                            value:true,
                            message:"phone must be Required"
                        }, pattern:{
                            value:/^(?:\+88|88)?(01[3-9]\d{8})$/,
                            message:"valid Phone  must be valid at least 11 characters "
                        },
                        maxLength:{
                            value:11,
                            message:"Phone  must be at least 11 characters "
                        },
                        minLength:{
                            value:11,
                            message:"Phone  must be at least 11 characters "
                        }
                    })}
                    />
            {errors.phone?.type === "required" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.phone?.message)}</p>
      )}
      {errors.phone?.type === "maxLength" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.phone?.message)}</p>
      )}   
      {errors.phone?.type === "pattern" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.phone?.message)}</p>
      )}   
      {errors.phone?.type === "minLength" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.phone?.message)}</p>
      )}   

                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="password_2" className="block font-medium">
                        image
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        placeholder="Enter Your Email"
                        type="file"
                        {...register("file", { required:{
                            value:true,
                            message:"Image must be Required"
                        }})}
                    />
                    {errors.file?.type === "required" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.file?.message)}</p>
      )}
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <label htmlFor="password_2" className="block font-medium">
                        address
                    </label>
                    <textarea
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        placeholder="Enter Your Address"
                        
                        {...register("address", { required:{
                            value:true,
                            message:"Address must be Required"
                        }})}
                    />
                    {errors.address?.type === "required" && (
        <p className="my-3 text-red-500 font-bold">{String(errors.address?.message)}</p>
      )}
        <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={() => setTerms(!terms)}
            />
            <label htmlFor="terms" className="text-sm">
              I accept the <Link to="/terms&Condtions" className="text-blue-600 underline">Terms & Conditions</Link>
            </label>
          </div>
                </div>
                <button
            type="submit"
            disabled={!terms}
            className={`w-full rounded-md px-4 py-2 text-white transition-colors ${terms ? 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-700' : 'bg-gray-400 cursor-not-allowed'} `}
          >
            Sign Up
          </button>
            </form>

          
            <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                Already have an account?
                <span className="text-blue-600 font-bold ml-2"><Link to='/login' className="font-semibold underline">
                    please Login
                </Link></span>
            </p>
            
           
               
            
        </div> 
        </div>
    );
};

export default SignUp;