
import { useForm } from "react-hook-form";


const UpdateBookingModel = ({update}) => {
   console.log({update});
   const { register, handleSubmit, watch } = useForm();
   
   const onSubmit = (data) => {
     const updateInfo ={
      date : data.date,
     startTime:data.time
     }
     console.log(updateInfo);
   };
 
 
   
    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
  <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <div className="modal-action">
    <div className="card bg-base-100 w-full shadow-xl ">
  <div className="card-body">
   <div className="text-center">
   <h1 className=" text-xl  uppercase bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text font-semibold">Update Booking </h1>
   </div>
   {/* // form  */}
   <form onSubmit={handleSubmit(onSubmit)} className="border border-cyan-500 rounded-3xl p-5 my-5">
  
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-center items-center">
   <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Date</span>
  </div>
  <input  
     type="date" 
     defaultValue={update.date} 
     {...register("date")}
     className="input input-info"/>
  </label>
   <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">StartTime</span>
  </div>
  <input 
  type="time" 
  defaultValue={update.startTime}
 className="input input-info"
 {...register("time")}
   />
  </label>
   
    

     </div>
     <input type="submit" value="update Booking" className="btn btn-outline btn-info w-full my-5" />
   </form>
   <div>
    <p className="text-red-500 font-bold my-5">N.B : date & Time format automatic setup</p>
   </div>
  </div>
</div>
    </div>
  </div>
</div>
        </div>
    );
};

export default UpdateBookingModel;