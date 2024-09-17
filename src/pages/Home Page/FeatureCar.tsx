import { useGetCarsQuery } from "../../redux/features/Cars/CarApi";


const FeatureCar = () => {
  const {data:cars} = useGetCarsQuery({})
  console.log(cars);
  const featureCar = cars?.data?.filter(car=> car.isFeatured === true)
  console.log(featureCar);
    return (
       <div className="p-10">
         <div className="lg:my-32  ">
          <h1 className="text-center lg:text-5xl text-warning font-bold my-16 text-2xl"><span className="underline-hover">Our Features Cars</span></h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center my-12 border border-info rounded-3xl p-10">
            {featureCar?.map(car=>
              <div className="card glass w-96">
              <figure>
                <img
                  src={car.image}
                  alt={car.name} />
              </figure>
              <div className="card-body">
                <h2 className=" font-bold lg:text-xl my-3 text-center">{car.name} {car.model}</h2>
                <p className="text-justify my-2">{car.description}</p>
                <p className="text-orange-600 font-semibold lg:text-xl">PricePerHour : $ {car.pricePerHour}</p>
                
              </div>
            </div>
            )}
          </div>
        </div>
       </div>
    );
};

export default FeatureCar;