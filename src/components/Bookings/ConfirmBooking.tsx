import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCreateBookingMutation, useGetAllBookingQuery } from "../../redux/features/bookings/bookingApi";

import LoadingPage from "../../pages/shared/LoadingPage";
 

const ConfirmBooking = () => {
   const location = useLocation()
   const bookData = location.state
   const navigate = useNavigate()
   const {refetch} =useGetAllBookingQuery(undefined)
   const [bookings,{isLoading}] = useCreateBookingMutation()
   const handleBack = () => {
    navigate(`/bookNow/${bookData?.bookData?.car?._id}`, { state: { car: bookData?.bookData?.car } });
};
const handleBooking = async () => {
   
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm booking!"
    });

  
    if (result.isConfirmed) {
        try {
          
            const book = {
                carId: bookData?.bookData?.car?._id,
                date: bookData?.bookData?.date,
                startTime: bookData?.bookData?.startTime,
                nid: bookData?.bookData?.nid,
                passport: bookData?.bookData?.passport,
                drivingLicense: bookData?.bookData?.drivingLicense
            };

           
            const res = await bookings(book).unwrap();

            if(res.success){
                Swal.fire({
                    title: "Success!",
                    text: `${res.message}`,
                    icon: "success"
                });
                refetch()
                navigate('/dashboard/my-booking')
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
};

if(isLoading) {
    return <LoadingPage/>
}
    return (
        <div>
          
            <div className="my-16">
            
            <div className="card glass w-[80%] container mx-auto p-10">
            <h1 className="lg:text-2xl  font-bold text-center">Booking Confirm for <strong className="text-orange-600">{bookData?.bookData?.car?.name}</strong></h1>
           
  <div className="card-body">
        <div className="text-center lg:text-2xl font-bold">
      {bookData?.bookdata?.car?.model ?<p className="my-3"><strong>Car Model:</strong> {bookData?.bookData?.car.model}</p>:""  }
      <p className="my-3"><strong>Date: </strong> {bookData?.bookData?.date}</p>
      <p className="my-3"><strong>Start Time: </strong> {bookData?.bookData?.startTime}</p>
      {bookData?.bookData?.nid && <p className="my-3"><strong>NID: </strong> {bookData?.bookData?.nid}</p>}
    {bookData?.bookData?.passport && <p className="my-3"><strong>Passport: </strong> {bookData?.bookData?.passport}</p>}
      <p className="my-3"><strong>Driving License: </strong> {bookData?.bookData?.drivingLicense}</p>
      <p className="my-3"><strong>Price: </strong > <span className="text-orange-600">$ {bookData?.bookData?.car.pricePerHour}</span></p>
      <div className="flex justify-center items-center gap-5 my-8">
      <button onClick={handleBack} className="btn btn-outline btn-accent">Back </button>
      <button onClick={handleBooking} className="btn btn-outline btn-info">Confirm </button>
      </div>
        </div>
      
  </div>
</div>
            </div>
        </div>
    );
};

export default ConfirmBooking;