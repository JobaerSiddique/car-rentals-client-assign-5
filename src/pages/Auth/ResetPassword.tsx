import Swal from "sweetalert2";
import LoadingPage from "../shared/LoadingPage";
import { useForm } from "react-hook-form";


const ResetPassword = () => {
    const {register,formState: { errors },handleSubmit} = useForm()
    // const [forget,{data,isLoading,error}]= ()
    
    // if(isLoading){
    //     return <LoadingPage/>
    //    }
    const onSubmit=(data)=>{
        console.log(data);
    }
        // const onSubmit = async(data) => {
        //     const result = await Swal.fire({
        //         title: "Are you sure?",
        //         text: "Do you  forget your Password?",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#3085d6",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Yes"
        //     });
        
          
        //     if (result.isConfirmed) {
        //         try {
        //             const datas ={
        //                 email:data.email
        //             }
                     
        //             const res = await forget(datas).unwrap();
        
        //             if(res.success){
        //                 Swal.fire({
        //                     title: "Success!",
        //                     text: `${res.message}`,
        //                     icon: "success"
        //                 });
                        
                      
        //             }
                    
               
        
        //         } catch (err) {
                    
        //             console.error(err);
        //             Swal.fire({
        //                 title: "Error!",
        //                 text: `${err.data.message}`,
        //                 icon: "error"
        //             });
        //         }
        //     }
        // }
    return (
        <div className="flex justify-center items-center h-screen">
          
            <div className="card glass w-auto ">


<div className="card-body">
    <h2 className="text-center text-xl lg:text-3xl text-orange-600 font-extrabold">Reset Password</h2>
    <form onSubmit={handleSubmit(onSubmit)}  className="border border-cyan-500 rounded-3xl p-10 my-10">
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Email</span>
  </div>
  <input 
  type="text" 
  placeholder="Enter your email address" 
  {...register("email", { required: {
    value: true,
    message: "Email is required"
  } })}
  className="input input-bordered input-info w-full " />
   {errors.email?.type === "required" && (
        <p className="text-red-500 font-bold mt-4">{errors?.email?.message}</p>
      )}

</label>
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Password</span>
  </div>
  <input 
  type="text" 
  placeholder="Enter your password" 
  {...register("password", { required: {
    value: true,
    message: "Password is required"
  },
  maxLength:{
    value:6,
    message:"Password must be at least 6 characters "
}
})}
  className="input input-bordered input-info w-full " />
   {errors.password?.type === "required" && (
        <p className="text-red-500 font-bold mt-4">{errors?.password?.message}</p>
      )}
   {errors.password?.type === "maxLength" && (
        <p className="text-red-500 font-bold mt-4">{errors?.password?.message}</p>
      )}

</label>
<input type="submit" value="Submit"  className="btn btn-outline btn-info mt-5 w-full" />
    </form>
    <p className="text-red-500 font-extrabold p-5 mt-8">N.B : You can Change Your Password at 3 times be Carefull</p>
  </div>

</div>
        </div>
    );
};

export default ResetPassword;