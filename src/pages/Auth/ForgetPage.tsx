import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useForgetPasswordMutation } from "../../redux/features/Users/UserApi";
import LoadingPage from "../shared/LoadingPage";


const ForgetPage = () => {
    const {register,formState: { errors },handleSubmit} = useForm()
   const [forget,{isLoading}]= useForgetPasswordMutation()


   if(isLoading){
    return <LoadingPage/>
   }
    const onSubmit = async(data) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you  forget your Password?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        });
    
      
        if (result.isConfirmed) {
            try {
                const datas ={
                    email:data.email
                }
                 
                const res = await forget(datas).unwrap();
    
                if(res.success){
                    Swal.fire({
                        title: "Success!",
                        text: `${res.message}`,
                        icon: "success"
                    });
                    
                  
                }
                
           
    
            } catch (err) {
                
                console.error(err);
                Swal.fire({
                    title: "Error!",
                    text: `${err.data.message}`,
                    icon: "error"
                });
            }
        }
    }
    return (
      <div className="bg-cover bg-no-repeat" style={{backgroundImage:"url('https://t3.ftcdn.net/jpg/05/59/69/16/360_F_559691636_nYRNiOMkKPA8IQNpypQHCe1DVbJubhFu.jpg')"}}>
          <div className="flex justify-center items-center h-screen">
          
          <div className="card glass w-auto ">


<div className="card-body">
  <h2 className="text-center text-xl lg:text-3xl text-orange-600 font-extrabold">Forget Password</h2>
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
      <p className="text-red-500 font-bold mt-4">{String(errors?.email?.message)}</p>
    )}

</label>
<input type="submit" value="Submit"  className="btn  btn-warning mt-5 w-full" />
  </form>
</div>

</div>
      </div>
      </div>
    );
};

export default ForgetPage;