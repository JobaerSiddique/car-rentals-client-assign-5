import { useNavigate } from "react-router-dom";



const SearchResultBooking = ({cars}) => {
    
  const availableCars = cars?.data?.filter((car) => car.status === "available");

  const navigate = useNavigate()

  const handleBook =(car) =>{
  navigate(`/bookNow/${car._id}`,{ state: { car } })
}

  return (
    <>
    <div className="my-16 p-10">
             {availableCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 justify-center items-center">
          {availableCars.map((car) => <div className="card glass w-auto">
  <figure>
    <img
      src={car.image}
      alt={car.name} />
  </figure>
  <div className="card-body">
    <h2 className="text-center text-xl lg:text-2xl font-bold my-8">{car.name}</h2>
    <p className="text-justify">{car.description}</p>
    <p className="font-bold text-lg my-5">Price : $ <span className="text-orange-600">{car.pricePerHour}</span></p>
     <button className="btn btn-outline btn-info" onClick={()=>handleBook(car)} >Book Now</button>
  </div>
</div>)}
        </div>
      ) : (
        <div className="text-center">
          <p className="dark:text-white">No available cars at the moment.</p>
        </div>
      )}
        </div>

        
    </>
        
    );
};

export default SearchResultBooking;