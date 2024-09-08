import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useGetReturnCarMutation } from "../../redux/features/bookings/bookingApi";
import LoadingPage from "../../pages/shared/LoadingPage";



const ReturnBookingModel = ({book}) => {
    
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [carReturn,{data,isLoading,error:returnError}] =useGetReturnCarMutation()

    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const maxDateString = maxDate.toISOString().split('T')[0];
    
   console.log({book});
    
    const onSubmit = async(data) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!"
        });
   
        if (result.isConfirmed) {
            try {
              const returns = {
                bookingId: data.bookingId,
                endTime:data.endTime,
                endDate:data.date
              }
                const res = await carReturn (returns).unwrap();  // Await the approve mutation
                console.log({res});
                if (res?.success) {
                    Swal.fire({
                        title: "Return Car!",
                        text: `${res?.message}`,
                        icon: "success"
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Failed to Approve: ${error?.data?.message}`,  // Display error if approval fails
                });
            }
        }
    };

    if(isLoading){
        return <LoadingPage/>
    }

    
    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
  <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
   <form onSubmit={handleSubmit(onSubmit)} >
   <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-3">
   <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Booking Id</span>
</div>
    <input 
      defaultValue={book._id} 
         disabled
 className="input input-bordered w-full max-w-xs"  />
 <input 
 defaultValue={book._id} 
type="hidden" 
{...register("bookingId")}
                                    />
</label>
<label className="form-control w-full max-w-xs">
<div className="label">
 <span className="label-text">Date <span className="text-red-500 font-bold">*</span></span>
</div>
<input 
  type="date" 
 min={today} 
 max={maxDateString} 
{...register("date", { 
 required: {
value: true,
message: "Date is required"
} 
})} 
className="input input-bordered w-full max-w-xs" />
{errors.date && <p className="text-red-500 font-bold mt-4">{errors.date.message}</p>}
</label>
   
   
<label className="form-control w-full max-w-xs">
<div className="label">
 <span className="label-text">End Time <span className="text-red-500 font-bold">*</span></span>
</div>
<input 
type="time"  
{...register("endTime", { 
required: {
value: true,
message: "End Time is required" } 
})} 
className="input input-bordered w-full max-w-xs" />
{errors.endTime && <p className="text-red-500 font-bold mt-4">{errors.endTime.message}</p>}
                                </label>
</div>
{book.endTime === null ? (
 <input
 type="submit"
className="btn btn-outline btn-success w-full my-5"
value="Return Car" />) : 
( <p>Car Return</p>
                        )}
   </form>
  </div>
</div>
        </div>
    );
};

export default ReturnBookingModel;