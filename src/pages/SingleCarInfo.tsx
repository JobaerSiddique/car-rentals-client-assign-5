import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCarsByIdQuery } from "../redux/features/Cars/CarApi";
import { toast } from "sonner";
import LoadingPage from "./shared/LoadingPage";
import { handleError } from "./shared/HandleError";
import {
  CarouselProvider,
  Slider,
  Slide
 
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css"; // Import carousel styles
import './SinglePageInfo.css'
// Define the Car type
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

  // Function to handle booking
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
  console.log(car);

  if (!car) {
    toast("Car not found");
    return null; 
  }

  return (
    <div className="container mx-auto p-5">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <div className="hero min-h-screen">
            <div className="hero-content flex-col gap-10 lg:flex-row">
              {/* Single Image Carousel with Zoom */}
              <div className="relative">
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={125}
                  totalSlides={1}
                  lockOnWindowScroll={true}
                >
                  <Slider>
                    <Slide index={0}>
                      <div className="carousel-image-wrapper">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="carousel-image"
                        />
                      </div>
                    </Slide>
                  </Slider>
                 
                
                </CarouselProvider>
              </div>

              {/* Car Info */}
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
