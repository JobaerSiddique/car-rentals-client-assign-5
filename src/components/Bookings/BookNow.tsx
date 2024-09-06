import { useLocation } from "react-router-dom";


const BookNow = () => {
    const location = useLocation();
    const { car } = location.state;

    console.log("book",car);
    return (
        <div className="border border-cyan-500 rounded-3xl  p-10 justify-center" >
            <div className="flex gap-10 justify-between   ">
            <div>
            <p className="lg:text-2xl font-bold ligh:text-sky-500 ">{car.name}</p>
            </div>
            <div>
            <p className="font-bold lg:text-2xl">price :  <span className="text-orange-600">$ {car.pricePerHour}</span></p>
            </div>
            </div>
            <div className="my-10">
            <div className="card glass w-full">
  
  <div className="card-body">
    <h1 className="text-center text-orange-600 font-bold lg:text-2xl uppercase">Booking For {car.name} {car.model}</h1>
    <form >
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-10">
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </div>
</label>
        </div>
    </form>
  </div>
</div>
            </div>
        </div>
    );
};

export default BookNow;