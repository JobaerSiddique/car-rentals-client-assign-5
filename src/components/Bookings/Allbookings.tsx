import Swal from "sweetalert2";
import LoadingPage from "../../pages/shared/LoadingPage";
import { useDeleteBookingsMutation, useGetAllBookingQuery, useGetApproveMutation, useGetBookingsQuery } from "../../redux/features/bookings/bookingApi";
import { useState } from "react";
import ReturnBookingModel from "../Modal/ReturnBookingModel";


const Allbookings = () => {
   const {data,isLoading:bookingLoading,error:bookingError} = useGetAllBookingQuery()
   const [approve,{data:approveData,isLoading:approveLoading}] = useGetApproveMutation()
   const [deleteBooking,{data:deleteData,isLoading:deleteLoading}] =useDeleteBookingsMutation()
    const {refetch} = useGetBookingsQuery()
    const [returnModal,setReturnModal]=useState(false)
    const [returnBook,setReturnBook] = useState("")
// approve handeling
const handleApprove = async (id) => {
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
            const res = await approve(id).unwrap();  
            console.log({res});
            if (res?.success) {
                Swal.fire({
                    title: "Approved!",
                    text: `${res?.message}`,
                    icon: "success"
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Failed to Approve: ${error?.message}`,  
            });
        }
    }
};
const handleCancel = async (id) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "Cancel This Booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!"
    });

    if (result.isConfirmed) {
        try {
            const res = await deleteBooking(id).unwrap();  
            console.log({res});
            if (res?.success) {
                Swal.fire({
                    title: "DELETED!",
                    text: `${res?.message}`,
                    icon: "success"
                });
                refetch();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Failed to Approve: ${error?.message}`,  
            });
        }
    }
};

// handleCancel
const handleReturn = (booking)=>{
    setReturnModal(true)
    setReturnBook(booking)
}

   
   const hasDuration = data?.data?.result.some(booking => booking.duration != null);
   const hasTotalCost = data?.data?.result.some(booking => booking.totalCost != null);
   if(bookingLoading || approveLoading || deleteLoading) {
    return <LoadingPage />
   }
   if(bookingError){
    console.log({bookingError});
   }
    return (
        <>
        <div>
        <div className="card glass w-[95%] container mx-auto my-16">
  
  <div className="card-body">
  <div className="overflow-x-auto">
  <table className="table text-center">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>BookingID</th>
        <th>Car Info</th>
        <th>Date</th>
        <th>StartTime</th>
        <th>NID/Passport</th>
        <th>Driving Licence</th>
        <th>Price Per Hour</th>
        <th>Duration</th>
        <th>Total Cost</th>
        <th>Actions</th>
        <th>Return Process</th>
        <th>Pay</th>
      </tr>
    </thead>
    <tbody>
        {
            data?.data?.result.map((booking,index)=><tr key={booking._id} className={booking.isDeleted?"line-through text-red-500 ":""}>  
            <th>{index+1}</th>
            <td className="font-bold ">{booking._id}</td>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={booking?.car?.image}
                      alt={booking?.car?.name} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{booking?.car?.name}</div>
                  {booking?.car?.model?<div className="text-sm opacity-80">{booking?.car?.model}</div>:""}
                </div>
              </div>
            </td>
            <td>{booking.date}</td>
            <td>{booking.startTime}</td>
            {booking.nid? <td> NID : {booking.nid}</td>:<td>{booking.nid} <br /><span>Passport: {booking.passport}</span></td>}
            {booking.drivingLicense?<td>{booking.drivingLicense}</td>:""}
            <td>$ {booking?.car?.pricePerHour}</td>
            {hasDuration && <td>{booking.duration ? `${booking.duration} hrs` : <p className="text-red-500 font-bold">Running</p>}</td>}
            {hasTotalCost && <td>{booking.totalCost ? `$${booking.totalCost}` : <p className="text-red-500 font-bold">Running</p>}</td>}
            {booking.isDeleted || booking.
approve? <td >
                <div className="flex justify-items-center gap-3">
                <button disabled className="btn btn-ghost btn-sm">Delete</button>
                <button disabled className="btn btn-primary btn-sm ml-2">Edit</button>
                </div>
                
            </td>:<td >
                <div className="flex justify-items-center gap-3">
                <button onClick={()=> handleApprove(booking._id)} className="btn btn-outline btn-success btn-sm">Approve</button>
                <button onClick={()=> handleCancel(booking._id)} className="btn btn-outline btn-error btn-sm">Cancel</button>
                </div>
                
            </td>}
            <td>
                {!booking.isDeleted && booking.endTime === null?<label onClick={()=>handleReturn(booking)} htmlFor="my_modal_6" className="btn btn-outline btn-warning btn-xs">Return Car</label>:<p className="text-red-500 text-xs font-bold">Car Returned</p>
                // <label htmlFor="my_modal_6"><button onClick={()=>handleReturn(booking)} className="btn btn-outline btn-warning btn-xs">Return Car</button></label>
                
                }
            </td>
            <td>{booking.paid ==="paid"? <p className="text-green-600 font-semibold text-sm">Paid</p>:<p className="text-red-600 font-semibold text-sm">Unpaid</p>}</td>
          </tr>)
        }
      
      
   
      
     
     
    </tbody>
    {/* foot */}
   
  </table>
</div>
  </div>
</div>
          </div>
        {returnModal && <ReturnBookingModel book={returnBook}/>}
        </>
    );
};

export default Allbookings;