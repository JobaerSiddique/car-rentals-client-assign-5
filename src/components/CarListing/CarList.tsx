import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";


const CarList = ({cars,error,isLoading}) => {
  
  if(isLoading){
    return <div className="flex justify-center h-screen">
    <span className="loading loading-bars loading-xs"></span>
    <span className="loading loading-bars loading-sm"></span>
    <span className="loading loading-bars loading-md"></span>
    <span className="loading loading-bars loading-lg"></span>
    </div>
  }
  
    if(error){
     toast.error(error?.data?.message);
     Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error?.data?.message}`,
     
    });


   }
   const availableCars = cars?.data?.filter((car) => car.status === "available");
   const deletedCar = cars?.data?.filter((car) => car.isDeleted === "false");
   console.log({availableCars,deletedCar});
    return (
        <div className="my-12">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-14 justify-items-center items-center p-6">
            {
               deletedCar&& availableCars?.map(car=><div key={car._id} className="card glass w-auto">
                    <figure>
                      <img
                        src={car.image}
                        alt="car!" />
                    </figure>
                    <div className="card-body">
                      <h2 className="text-center font-bold text-xl hover:underline uppercase mb-4 animate-pulse text-orange-600">{car.name}</h2>
                      <p className="text-justify text-gray-600 font-semibold">{car.description}</p>
                      <p className="font-bold text-xl my-5">Price : <span className="text-orange-600 font-bold">${car.pricePerHour}</span></p>
                      <div className="card-actions justify-center">
                        <Link to={`/carInfo/${car._id}`} className="btn btn-outline">View Details</Link>
                      </div>
                    </div>
                  </div>)
            }
            </div> 
        </div>
    );
};

export default CarList;