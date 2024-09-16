import Lottie from "react-lottie-player";
import contactAnimation from "../../contact.json"
import { useForm } from "react-hook-form";
import { useCreateContactMutation } from "../redux/features/Contact/ContactApi";
import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const {register,formState: { errors },handleSubmit} = useForm() 
  const [contacts,{data:contactInfo,isLoading,error}] = useCreateContactMutation()
  const [apiError, setApiError] = useState(''); 
  const onSubmit =async (data) => {
    try {
      const contactData = {
        name: data.name,
        email: data.email,
        message: data.message,
      };
      const res = await contacts(contactData).unwrap();
      toast(res.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        type: "success"
      });
    } catch (error) {
      setApiError(error.data?.message || 'An unexpected error occurred');  
      toast("Error: " + (error.data?.message || 'An unexpected error occurred'), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        type: "error"
      });
    }
    
  }

  console.log("cc",contactInfo);
  return (
        <div>
            <div className="hero bg-slate-100 min-h-screen shadow-2xl rounded-3xl ">
  <div className="hero-content flex-col lg:flex-row gap-20 lg:gap-64 ">
  <Lottie
             loop
             animationData={contactAnimation}
             play
             style={{ width: 300, height: 300 }}
           />
    <div className="ml-10 ">
      <h1 className="lg:text-3xl text-xl font-bold">Contact Please If You Need</h1>
      {apiError && (
            <div className="text-red-500 text-center mt-2 font-bold">{apiError}</div>
          )}
      <div className="card   w-full shadow-2xl mt-10">
  <div className="card-body">
    <form onSubmit={handleSubmit(onSubmit)} >
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Name <span className="text-red-500 font-bold">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Your Name" 
  {...register("name", { required: true })}
  className="input input-bordered w-full " />
   {errors.name?.type === "required" && (
        <p className="text-red-500 font-bold mt-2"> Name is required</p>
      )}
</label>
    <label className="form-control w-full  my-4">
  <div className="label">
    <span className="label-text">Email <span className="text-red-500 font-bold">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Your Email" 
  {...register("email", { required: true })}
  className="input input-bordered w-full " />
   {errors.email?.type === "required" && (
        <p className="text-red-500 font-bold mt-2">Email is required</p>
      )}
</label>
    <label className="form-control w-full my-4 ">
  <div className="label">
    <span className="label-text">Message<span className="text-red-500 font-bold">*</span></span>
  </div>
  <textarea 
   {...register("message", { required: true })}
  placeholder="Enter Your Message" 
  className="input input-bordered w-full h-32 " />
   {errors.message?.type === "required" && (
        <p className="text-red-500 font-bold mt-2">Message is required</p>
      )}
</label>
<input type="submit" value="Submit" className="btn btn-outline btn-info my-3 w-full" />
    </form>
  </div>
</div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Contact;