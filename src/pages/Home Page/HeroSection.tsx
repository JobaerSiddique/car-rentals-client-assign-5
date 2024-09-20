import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useGetCarsQuery } from '../../redux/features/Cars/CarApi';
import { useState } from 'react';
import SearchResultBooking from '../../components/Bookings/SearchResultBooking';

interface SearchCriteria {
    location?: string;
    startDate?: string;
    endDate?: string;
    types?: string;
}

interface FormValues {
    location: string;
    startDate: string;
    endDate: string;
    types: string;
}

const HeroSection = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>(undefined);

    const { data: cars } = useGetCarsQuery(searchCriteria, {
        skip: !searchCriteria,
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const query = {
            location: data.location,
            startDate: data.startDate,
            endDate: data.endDate,
            types: data.types
        };
        setSearchCriteria(query);
    };

  
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.pinimg.com/736x/0a/6f/71/0a6f7100b618dee7f148e287469de7fd.jpg)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-center">
                    <div className="w-full">
                        <h1 className="mb-5 text-5xl font-bold text-warning">Find the Perfect  Car for Your Journey</h1>
                        <p className="my-16 lg:text-2xl text-warning ">
                            Best prices, excellent services, 24/7 customer support
                        </p>
                        <Link
                            to="/carInfo/66dc842afa89f0fbaef15dca"
                            className="bg-yellow-500 text-black py-3 px-6 rounded-full text-lg sm:text-xl font-semibold hover:bg-yellow-600 transition duration-300 my-10"
                        >
                            Book Now
                        </Link>

                        <div className="card glass my-14">
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-3 md:gap-5 w-full   ">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="text-orange-500">Location</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Location"
                                            {...register('location')}
                                            className="input input-bordered input-info w-full text-slate-600"
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="text-orange-500">Pick-Up Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            {...register('startDate', {
                                                required: "Pick-Up date is required",
                                            })}
                                            min={today}
                                            className="input input-bordered input-info text-slate-600 w-full"
                                        />
                                        {errors.startDate && (
                                            <p className="text-red-600 mt-2 font-semibold">{String(errors.startDate.message)}</p>
                                        )}
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="text-orange-500">Drop-Off Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            {...register('endDate', {
                                                required: "Drop-Off date is required",
                                            })}
                                            min={today}
                                            className="input input-bordered input-info text-slate-600 w-full"
                                        />
                                        {errors.endDate && (
                                            <p className="text-red-600 mt-2 font-semibold">{String(errors.endDate.message)}</p>
                                        )}
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="text-orange-500">Car Type</span>
                                        </label>
                                        <select
                                            {...register('types', {
                                                required: "Car type is required",
                                            })}
                                            className="select select-info text-slate-600 w-full"
                                        >
                                            <option value="">Select Car Type</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Sedan">Sedan</option>
                                            <option value="Hybrid">Hybrid</option>
                                        </select>
                                        {errors.types && (
                                            <p className="text-red-600 mt-2 font-semibold">{String(errors.types.message)}</p>
                                        )}
                                    </div>

                                    <div className="form-control w-full col-span-1 sm:col-span-2 lg:col-span-3 mt-5">
                                        <input
                                            type="submit"
                                            value="Search"
                                            className="btn btn-outline btn-warning mt-5 transition duration-300 w-full"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {searchCriteria && <SearchResultBooking cars={cars} />}
        </>
    );
};

export default HeroSection;
