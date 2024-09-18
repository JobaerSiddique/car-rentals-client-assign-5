import { useGetPaymentHistoryQuery } from "../../redux/features/Payment/PaymentApi";


const UserPaymentHistory = () => {
    const {data:info} = useGetPaymentHistoryQuery(undefined)
   
    const booking = info?.data?.bookingId;
    const user = booking?.user;
    const car = booking?.car;
    console.log(booking,user,car);
    return (
        <div>
            <h1 className="lg:text-3xl text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Welcome to {info?.data?.[0]?.bookingId?.user?.name}</h1>
            <div className="card glass w-full my-20">
 
  <div className="card-body ">
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>BookingID</th>
        <th>Payment Date</th>
        <th>Payment Time</th>
        <th>Trans ID</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {info?.data?.map((info,i)=> <tr className="hover font-bold">
        <th>{i+1}</th>
        <td>{info.bookingId._id}</td>
        <td>{info.date}</td>
        <td>{info.time}</td>
        <td>{info.transId}</td>
        <td className="text-orange-600 font-extrabold">$ {info.totalCost}</td>
        <td className="text-green-600 font-extrabold">{info.status}</td>
        
      </tr>)}
    
    </tbody>
  </table>
</div>
  </div>
</div>
        </div>
    );
};

export default UserPaymentHistory;