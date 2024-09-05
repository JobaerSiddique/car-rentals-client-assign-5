
import { useDeleteBookingsMutation, useGetBookingsQuery } from "../../redux/features/bookings/bookingApi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import noData from "../../../no-Data.json"
import Lottie from "react-lottie-player";
import LoadingPage from "../../pages/shared/LoadingPage";
import Swal from "sweetalert2";
import { useState } from "react";

const Userbooking = () => {
 
    const {data:bookings=[],isLoading:bookingLoading,error:bookingError} = useGetBookingsQuery()
   const [deleteBooking,{data,isLoading}] = useDeleteBookingsMutation()
    const [updateModel,setUpdateModel] = useState(false)
  if(bookingLoading || isLoading) {
    return <LoadingPage/>
  }


const handleBookingDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
       
        const res = await deleteBooking(id);
  
       console.log(res.data?.message);
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text:  `${res?.data?.message}`,
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `${res?.data?.data?.message}`,
            icon: "error"
          });
        }
      }
    });
  };

    return (
      <div>
      <div className="card bg-base-100 w-auto shadow-xl">
          <div className="card-body">
              <div className="overflow-x-auto">
                  {bookings?.data?.length > 0 ? (
                      <table className="table">
                          {/* head */}
                          <thead>
                              <tr>
                                  <th>Car Info</th>
                                  <th>User Info</th>
                                  <th>Booking ID</th>
                                  <th>Date</th>
                                  <th>Start Time</th>
                                  <th>End Time</th>
                                  <th>Price Per Hour</th>
                                  <th>Total Price</th>
                                  <th>Actions</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              {/* row 1 */}
                              {bookings?.data?.map((booking) => (
                                  <tr key={booking._id} className={booking.isDeleted? "line-through text-red-600 font-bold":"hover"}>
                                      <td>
                                          <div className="flex items-center gap-3">
                                              <div className="avatar">
                                                  <div className="mask mask-squircle h-12 w-12">
                                                      <img
                                                          src={booking.car.image}
                                                          alt={booking.car.name}
                                                      />
                                                  </div>
                                              </div>
                                              <div>
                                                  <div className="font-bold text-black">{booking.car.name}</div>
                                                  <div className="text-sm opacity-50">{booking.car.color}</div>
                                              </div>
                                          </div>
                                      </td>
                                      <td>
                                          UserName: {booking.user.name}
                                          <br />
                                          <span className="badge badge-ghost badge-sm">
                                              Phone : {booking.user.phone}
                                          </span>
                                      </td>
                                      <td>{booking._id}</td>
                                      <td>{booking.date}</td>
                                      <td>{booking.startTime}</td>
                                      <td>
                                          {booking.endTime ? (
                                              <p className="text-green-600 font-bold">{booking.endTime}</p>
                                          ) : booking.approve ? (
                                              <p className="text-red-600 font-bold">Running</p>
                                          ) : (
                                              <p className="text-yellow-600 font-bold">Pending Approval</p>
                                          )}
                                      </td>
                                      <td>$ {booking.car.pricePerHour}</td>
                                      <td>
                                          {booking.endTime ? (
                                              <p className="text-green-600 font-bold">$ {booking.totalCost}</p>
                                          ) : (
                                              <p className="text-red-600 font-bold">Pending</p>
                                          )}
                                      </td>
                                      {booking.approve  || booking.isDeleted ?(
                                          <td className="flex justify-center items-center gap-4">
                                              <button disabled className="btn btn-error btn-sm">
                                                  <RiDeleteBin5Line />
                                              </button>
                                              <button disabled className="btn btn-success btn-sm">
                                                  <LiaEdit />
                                              </button>
                                          </td>
                                      ) : (
                                          <td className="flex justify-center items-center gap-4">
                                              <button onClick={()=>handleBookingDelete(booking._id)} className="btn btn-error btn-sm">
                                                  <RiDeleteBin5Line />
                                              </button>
                                              <label htmlFor="my_modal_6" className="btn btn-success btn-sm"> <LiaEdit /></label>
                                              {/* <button className="btn btn-success btn-sm">
                                                 
                                              </button> */}
                                          </td>
                                      )}
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  ) : (
                    <div className="flex justify-center items-center h-screen">
                    <Lottie
             loop
             animationData={noData}
             play
             style={{ width: 300, height: 500 }}
           />
               </div>
                  )}
              </div>
          </div>
      </div>
  </div>
    );
};

export default Userbooking;