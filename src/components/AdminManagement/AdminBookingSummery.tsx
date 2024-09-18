import { useGetBookingSummeryQuery } from "../../redux/features/Admin/AdminBookingApi";
import BookingSummeryGraph from "./BookingSummeryGraph";


const AdminBookingSummery = () => {
    
    const {data}  = useGetBookingSummeryQuery(undefined)
    console.log(data?.data);
    const datas = [

        { name: 'Total Bookings', value: data?.data.totalBookings },
        { name: 'Available Cars', value: data?.data.availableCars },
        { name: 'Total Revenue', value: data?.data.totalRevenue },
    ]
    return (
        <div>
           <h1 className="my-16 lg:text-5xl md:text-2xl text-xl text-center font-bold text-cyan-500">Car Rentals booking Summery</h1>

           <div className="my-10">
           <div className="card bg-base-100 w-auto shadow-xl">
  <div className="card-body">
    <div className="flex justify-between  items-center gap-10">
        <h1 className="text-sm md:text-2xl lg:text-3xl text-blue-600 font-bold">Total Bookings : {data?.data?.totalBookings}</h1>
        <h1 className="text-sm md:text-2xl lg:text-3xl text-yellow-600 font-bold">Availables Cars : {data?.data?.availableCars }</h1>
        <h1 className="text-sm md:text-2xl lg:text-3xl text-green-600 font-bold">Total Revenue : ${data?.data?.totalRevenue}</h1>
    </div>
  </div>
</div>
           </div>
           <BookingSummeryGraph data={datas}/>
        </div>
    );
};

export default AdminBookingSummery;