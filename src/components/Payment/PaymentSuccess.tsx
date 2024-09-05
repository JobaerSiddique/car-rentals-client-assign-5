import { useParams } from "react-router-dom";
import { useGetPaymentInfoQuery } from "../../redux/features/Payment/PaymentApi";
import Lottie from "react-lottie-player";
import payment from '../../../payment-success.json'

const PaymentSuccess = () => {
    const {id} = useParams()
    console.log(id);
    const {data} = useGetPaymentInfoQuery(id)
    console.log(data?.data);
    return (
        <div>
           <div className="flex justify-center items-center h-screen">
                    <Lottie
             loop
             animationData={ payment}
             play
             style={{ width: 500, height: 500 }}
           />
               </div>
               <div className="card bg-base-100 w-[80%] shadow-xl container mx-auto">
  <div className="card-body">
  <div className="grid grid-cols-1 lg:grid-cols-2  gap-14 justify-between text-center border border-cyan-500 rounded-3xl p-10">
                <p>BookingId : {data?.data?.bookingId?._id}</p>
                <p>Transacion ID : {data?.data?.transId}</p>
                <p>TotalCost : ${data?.data?.totalCost}</p>
                <p>date : {data?.data?.date}</p>
                <p>Time : {data?.data?.time}</p>
                <p>Car Name : {data?.data?.bookingId?.car?.name} <span>{data?.data?.bookingId?.car?.model}</span></p>
                <p>Status : {data?.data?.status}</p>
                <p>Duration : {data?.data?.bookingId.duration} In hours</p>
               </div>
  </div>
</div>
               
        </div>
    );
};

export default PaymentSuccess;