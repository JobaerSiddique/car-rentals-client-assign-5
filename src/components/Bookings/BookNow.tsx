import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const BookNow = () => {
    const location = useLocation();
    const { car } = location.state;
    const { register, formState: { errors }, handleSubmit, getValues } = useForm<BookNowFormData>();
    const navigate = useNavigate();
   
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const maxDateString = maxDate.toISOString().split('T')[0];

    interface BookNowFormData {
        carId: string;
        date: string;
        nid?: string;
        passport?: string;
        startTime: string;
        drivingLicense: string;
      }


    const onSubmit = (data:BookNowFormData) => {
        const bookData = { ...data, car };
        console.log({ bookData });
        navigate('/confirmBook', { state: { bookData } });
    };

    return (
       <>
        <div className="border border-cyan-500 rounded-3xl p-10 justify-center">
            <div className="flex gap-10 justify-between">
                <div>
                    <p className="lg:text-2xl font-bold text-sky-500 ">{car.name} {car.model}</p>
                </div>
                <div>
                    <p className="font-bold lg:text-2xl">Price: <span className="text-orange-600">$ {car.pricePerHour}</span></p>
                </div>
            </div>
            <div className="my-10">
                <div className="card glass w-full">
                    <div className="card-body">
                        <h1 className="text-center text-orange-600 font-bold lg:text-2xl uppercase">Booking For {car.name} {car.model}</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-10 my-16 dark:text-white">
                                {/* Car ID */}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Car Id</span>
                                    </div>
                                    <input 
                                        defaultValue={car._id} 
                                        disabled
                                        className="input input-bordered w-full max-w-xs" 
                                    />
                                    <input 
                                        defaultValue={car._id} 
                                        type="hidden" 
                                        {...register("carId")}
                                    />
                                </label>

                                {/* Date */}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Date <span className="text-red-500 font-bold">*</span></span>
                                    </div>
                                    <input 
                                        type="date" 
                                        min={today} 
                                        max={maxDateString} 
                                        {...register("date", { 
                                            required: {
                                                value: true,
                                                message: "Date is required"
                                            } 
                                        })} 
                                        className="input input-bordered w-full max-w-xs" 
                                    />
                                    {errors.date && <p className="text-red-500 font-bold mt-4">{String(errors.date.message)}</p>}
                                </label>

                                {/* NID */}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">NID</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Your NID Number" 
                                        {...register("nid", {
                                            pattern: {
                                                value: /^\d{10}$|^\d{13}$|^\d{17}$/,
                                                message: "NID must be 10, 13, or 17 digits"
                                            },
                                            validate: (value) => {
                                                const { passport } = getValues();
                                                return value || passport ? true : "Either NID or Passport is required";
                                            }
                                        })}
                                        className="input input-bordered w-full max-w-xs" 
                                    />
                                    {errors.nid && <p className="text-red-500 font-bold mt-4">{String(errors.nid.message)}</p>}
                                </label>

                                {/* Passport */}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Passport</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Your Passport Number" 
                                        {...register("passport", {
                                            pattern: {
                                                value: /^[A-Z0-9]{7,9}$/,
                                                message: "Passport number must be between 7 to 9 alphanumeric characters"
                                            },
                                            validate: (value) => {
                                                const { nid } = getValues();
                                                return value || nid ? true : "Either NID or Passport is required";
                                            }
                                        })}
                                        className="input input-bordered w-full max-w-xs" 
                                    />
                                    {errors.passport && <p className="text-red-500 font-bold mt-4">{String(errors.passport.message)}</p>}
                                </label>

                                {/* Start Time */}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Start Time <span className="text-red-500 font-bold">*</span></span>
                                    </div>
                                    <input 
                                        type="time"  
                                        {...register("startTime", { 
                                            required: {
                                                value: true,
                                                message: "Start Time is required"
                                            } 
                                        })} 
                                        className="input input-bordered w-full max-w-xs" 
                                    />
                                    {errors.startTime && <p className="text-red-500 font-bold mt-4">{String(errors.startTime.message)}</p>}
                                </label>

                                {/* Driving License */}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Driving License <span className="text-red-500 font-bold">*</span></span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Driving License" 
                                        {...register("drivingLicense", { 
                                            required: {
                                                value: true,
                                                message: "Driving License is required"
                                            },
                                            pattern: {
                                                value: /^[A-Z]{2}-\d{7}$|^\d{13}$/,
                                                message: "Driving License must match the pattern (e.g., AB-1234567 or 13 digits)"
                                            }
                                        })}
                                        className="input input-bordered w-full max-w-xs" 
                                    />
                                    {errors.drivingLicense && <p className="text-red-500 font-bold mt-4">{String(errors.drivingLicense.message)}</p>}
                                </label>

                                {/* Color */}
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Color</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        defaultValue={car.color} 
                                        disabled
                                        className="input input-bordered w-full max-w-xs" 
                                    />
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button className="btn btn-outline btn-info w-full">Confirm Book</button>
                        </form>
                    </div>
                    <p className="text-red-500 font-bold p-8">N.B: * Fields Must be Required</p>
                </div>
            </div>
        </div>
       </>
    );
};

export default BookNow;
