import { useParams } from "react-router-dom";
import { useGetCarsByIdQuery } from "../redux/features/Cars/CarApi";
import { toast } from "sonner";
import {
  
  SideBySideMagnifier
  
} from "react-image-magnifiers";
import LoadingPage from "./shared/LoadingPage";

const SingleCarInfo = () => {
    const {id} = useParams()
    const {data,isLoading,error} = useGetCarsByIdQuery(id)
    // const cars= car?.data?.data

  if(error){
    return toast(error.message)
  }
  if(isLoading){
    return <LoadingPage/>
  }
  const car = data?.data;
  if(!car){
    return toast("Car not found")
  }
    
    return (
        <div>
          <div className="card bg-base-100 w-full shadow-xl">
  <div className="card-body">
  <div className="hero  min-h-screen">
  <div className="hero-content flex-col gap-52 lg:flex-row">
    
  <SideBySideMagnifier
            className="w-full"
            imageSrc={car.image} // Image URL for the original image
            largeImageSrc={car.image} // URL for the high-resolution image
            alwaysInPlace={true} // Magnifier moves with mouse
            overlayOpacity={0.5} // Adjusts the opacity of the overlay
            switchSides={true} // Control which side the magnified image appears o
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
      <p className="font-bold text-xl">PricePerHour : <span>${car.pricePerHour}</span></p>
      <p className="font-bold text-xl my-5">Status : <span>{car.status}</span></p>
      {car.status === 'available'?<button  className="btn btn-outline">Book now</button>:<button disabled className="btn btn-outline">Book now</button>}
    </div>
  </div>
</div>
  </div>
</div>
        
        </div>
    );
};

export default SingleCarInfo;