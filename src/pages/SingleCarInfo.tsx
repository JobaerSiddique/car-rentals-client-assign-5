import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCarsByIdQuery } from "../redux/features/Cars/CarApi";
import { toast } from "sonner";
import LoadingPage from "./shared/LoadingPage";
import { handleError } from "./shared/HandleError";
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';
import './SinglePageInfo.css'

interface Car {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  status: 'available' | 'unavailable';
  image: string;
}

const SingleCarInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const { data, isLoading, error } = useGetCarsByIdQuery(id);
  const navigate = useNavigate();

  const handleBooking = (id: string) => {
    if (data?.data) {
      navigate(`/bookNow/${id}`, { state: { car: data.data } });
    } else {
      toast("Car data not available for booking.");
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    handleError(error);
    return null; 
  }

  const car = data?.data as Car; 

  if (!car) {
    toast("Car not found");
    return null; 
  }

  return (
    <div className="container mx-auto p-5">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:gap-52 lg:flex-row">
            
              <div className="relative">
                <Zoom zoomMargin={40}>
                  <img
                    src={car.image}
                    alt="Car Image"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </Zoom>
              </div>

             
              <div>
                <h1 className="text-5xl font-bold">{car.name}</h1>
                <p className="py-6 text-justify font-semibold">
                  {car.description}
                </p>
                <p className="font-bold text-xl">
                  Price Per Hour: <span>${car.pricePerHour}</span>
                </p>
                <p className="font-bold text-xl my-5">
                  Status: <span>{car.status}</span>
                </p>
                {car.status === 'available' ? (
                  <button onClick={() => handleBooking(car._id)} className="btn btn-outline">
                    Book now
                  </button>
                ) : (
                  <button disabled className="btn btn-outline">
                    Book now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCarInfo;
