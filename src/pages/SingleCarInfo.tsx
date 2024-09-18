import { useNavigate, useParams } from "react-router-dom";
import { useGetCarsByIdQuery } from "../redux/features/Cars/CarApi";
import { toast } from "sonner";
import { SideBySideMagnifier } from "react-image-magnifiers";
import React from 'react';
import LoadingPage from "./shared/LoadingPage";
import { handleError } from "./shared/HandleError";

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
    return null; // Ensure that null is returned in case of error
  }

  const car = data?.data as Car; // Cast to Car type

  if (!car) {
    toast("Car not found");
    return null; // Ensure that null is returned if car data is not available
  }

  return (
    <div>
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col gap-52 lg:flex-row">
              <SideBySideMagnifier
                className="w-full"
                imageSrc={car.image}
                largeImageSrc={car.image}
                alwaysInPlace={true}
                overlayOpacity={0.5}
                switchSides={true}
                inPlaceMinBreakpoint={641}
                fillAvailableSpace={false}
                fillAlignTop={false}
                fillGapTop={10}
                fillGapRight={10}
                fillGapBottom={10}
                fillGapLeft={10}
                zoomContainerBorder="1px solid #ccc"
                zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
              />
              <div>
                <h1 className="text-5xl font-bold">{car.name}</h1>
                <p className="py-6 text-justify font-semibold">
                  {car.description}
                </p>
                <p className="font-bold text-xl">Price Per Hour: <span>${car.pricePerHour}</span></p>
                <p className="font-bold text-xl my-5">Status: <span>{car.status}</span></p>
                {car.status === 'available' ? (
                  <button onClick={() => handleBooking(car._id)} className="btn btn-outline">Book now</button>
                ) : (
                  <button disabled className="btn btn-outline">Book now</button>
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
