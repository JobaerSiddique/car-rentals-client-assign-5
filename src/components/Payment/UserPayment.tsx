
// @ts-ignore
import { useParams } from "react-router-dom";
import { useGetSingleBookingsQuery } from "../../redux/features/bookings/bookingApi";
import { useCreatePaymentMutation } from "../../redux/features/Payment/PaymentApi";
import LoadingPage from "../../pages/shared/LoadingPage";



const UserPayment = () => {
   const {id }= useParams()
   const {data:booking,isLoading} = useGetSingleBookingsQuery(id) 
   const [createPayment, { isLoading:paymenLoading, isError:paymentError }] = useCreatePaymentMutation();
 
   const handlePayment = async (bookingId:any) => {
   
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
   if(paymentError){
    return <p>Error : {paymentError?.data?.message}</p>
   }

   if(isLoading ||paymenLoading ){
    return <LoadingPage/>
   }
    return (
      
    <div>
         <div >
         <div className="card glass w-[90%] shadow-2xl ">
  
  <div className="card-body px-10 ">
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 justify-center items-center ">
    <div>
     
    <div className="border border-info rounded-3xl p-10">
      <h1 className="text-black font-bold lg:text-2xl">BookingID : {booking?.data?._id}</h1>
     <div className="divider divider-info uppercase text-2xl text-black my-8 font-semibold">User Information</div>
     <div className="m-5 font-bold text-xl text-orange-600 lg:text-xl">
     <h1>UserName : {booking?.data?.user.name}</h1>
     <h1>Phone : {booking?.data?.user.phone}</h1>
     <h1>Email : {booking?.data?.user.email}</h1>
     </div>
     <div className="divider divider-info uppercase text-2xl text-black my-8 font-semibold">Car Information</div>
     <div className="m-5  font-bold text-xl text-orange-600 ">
     <h1>Car Model : {booking?.data?.car.name} {booking?.data?.car.model}</h1>
     <h1>PricePerHour : ${booking?.data?.car.pricePerHour}</h1>
     <h1>Car Type : {booking?.data?.car.types}</h1>
     <h1>Payment Price : ${booking?.data?.totalCost}</h1>
     </div>
      {booking?.data?.paid === "paid"? <button 
      disabled className="btn btn-outline btn-info w-full">Pay Now</button>:<button onClick={() => handlePayment(booking?.data?._id)}
      className="btn btn-outline btn-info w-full flex items-center justify-center gap-2"> Pay now</button>}
    </div>
    </div>

    <div className="relative">
  <img className=" rounded-3xl" src={booking?.data?.car?.image} alt={booking?.data?.car?.name} />
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-red-600 text-3xl font-bold  bg-opacity-50 px-4 py-2 rounded-md text-center">Booked</span>
  </div>
</div>
   </div>
  </div>
</div>
            
        </div> 
  
 
  
  

        </div>
    );
};

export default UserPayment;