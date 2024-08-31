import { useParams } from "react-router-dom";
import { useGetSingleBookingsQuery } from "../../redux/features/bookings/bookingApi";
import { useCreatePaymentMutation } from "../../redux/features/Payment/PaymentApi";
import logo from "../../image/sslcommerz-removebg-preview.png"



const UserPayment = () => {
   const {id }= useParams()
   const {data:booking,isLoading,isError} = useGetSingleBookingsQuery(id) 
   const [createPayment, { isLoading:paymenLoading, isError:paymentError }] = useCreatePaymentMutation();
 
   const handlePayment = async (bookingId) => {
   
     try {
       const response = await createPayment(bookingId).unwrap();
       console.log({response});
       if (response.url) {
         window.location.href = response.url;
       }
     } catch (error) {
       console.error('Payment initiation failed:', error);
     }
   };
   if(isError){
    return <p>Error : {error.message}</p>
   }
    return (
      
        <div>
           
  
 
  <div className="hero ">
  <div className="hero-content flex-col lg:flex-row-reverse ">
    <img
      src={booking?.data?.car.image}
      className=" rounded-lg shadow-2xl animate-pulse" />
    <div>
      <h1 className="text-black font-bold lg:text-3xl">BookingID : {booking?.data?._id}</h1>
     <div className="divider divider-info uppercase text-2xl text-black my-8 font-semibold">User Information</div>
     <div className="m-5 text-black font-semibold lg:text-xl">
     <h1>UserName : {booking?.data?.user.name}</h1>
     <h1>Phone : {booking?.data?.user.phone}</h1>
     <h1>Email : {booking?.data?.user.email}</h1>
     </div>
     <div className="divider divider-info uppercase text-2xl text-black my-8 font-semibold">Car Information</div>
     <div className="m-5 text-black font-semibold">
     <h1>Car Model : {booking?.data?.car.name}</h1>
     <h1>PricePerHour : ${booking?.data?.car.pricePerHour}</h1>
     <h1>Car Type : {booking?.data?.car.types}</h1>
     <h1>Payment Price : ${booking?.data?.totalCost}</h1>
     </div>
      {booking?.data?.paid === "paid"? <button 
      disabled className="btn btn-outline btn-info w-full">Pay Now</button>:<button onClick={() => handlePayment(booking?.data?._id)}
      className="btn btn-outline btn-info w-full flex items-center justify-center gap-2"> Pay now</button>}
    </div>
  </div>
</div>
  

        </div>
    );
};

export default UserPayment;