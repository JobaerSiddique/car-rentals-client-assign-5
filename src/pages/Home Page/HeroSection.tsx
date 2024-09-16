import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useGetCarsQuery } from '../../redux/features/Cars/CarApi';
import { useState } from 'react';
import SearchResultBooking from '../../components/Bookings/SearchResultBooking';

const HeroSection = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchCriteria, setSearchCriteria] = useState();
    
    const { data: cars, refetch, isLoading, error } = useGetCarsQuery(searchCriteria, {
        skip: !searchCriteria,
    });

    const onSubmit = (data) => {
        const query = {
            location: data.location,
            startDate: data.startDate,
            endDate: data.endDate,
            types: data.types
        }
        setSearchCriteria(query);
    };
console.log("hh",cars);
    return (
       <>
        <section
            className="relative bg-cover bg-center h-screen flex flex-col justify-center"
            style={{ backgroundImage: "url('https://i.pinimg.com/736x/0a/6f/71/0a6f7100b618dee7f148e287469de7fd.jpg')" }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4 md:p-8">
                <h1 className="text-2xl pt-16 lg:text-5xl font-bold mb-6 text-warning">Find the Perfect Car for Your Journey</h1>
                <p className="mb-6 text-lg sm:text-xl">Best prices, excellent services, 24/7 customer support</p>
                <Link
                    to="/carInfo/66dc842afa89f0fbaef15dca"
                    className="bg-yellow-500 text-black py-3 px-6 rounded-full text-lg sm:text-xl font-semibold hover:bg-yellow-600 transition duration-300 my-10"
                >
                    Book Now
                </Link>
                <div className="card glass w-full sm:w-auto my-14">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 sm:gap-4 items-center">
                          
                            <div className="form-control w-full ">
                                <div className="label">
                                    <span className="text-orange-500">Location</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="enter Location"
                                    {...register('location', { required: {
                                        value:true,
                                        message: "location must be Required"
                                    }})}
                                    className="input input-bordered input-info w-full text-slate-600"
                                />
                                {errors.location && (
                                    <p className="text-red-600 mt-2 font-semibold">{errors.location.message}</p>
                                )}
                            </div>
                            <div className="form-control w-full ">
                                <div className="label">
                                    <span className="text-orange-500">Pick-Up-Date</span>
                                </div>
                                <input
                                    type="date"
                                    {...register('startDate', { required: {
                                        value:true,
                                        message: "Pick Up date must be Required"
                                    }})}
                                    className="input input-bordered input-info text-slate-600 w-full"
                                />
                                {errors.startDate && (
                                    <p className="text-red-600 mt-2 font-semibold">{errors.startDate.message}</p> 
                                )}
                            </div>
                            <div className="form-control w-full ">
                                <div className="label">
                                    <span className="text-orange-500">Drop-Up-Date</span>
                                </div>
                                <input
                                    type="date"
                                    {...register('endDate', { required: {
                                        value:true,
                                        message: "Drop up date must be Required"
                                    }})}
                                    className="input input-bordered input-info text-slate-600  w-full"
                                />
                                {errors.endDate && (
                                    <p className="text-red-600 mt-2 font-semibold">{errors.endDate.message}</p>
                                )}
                            </div>
                            <div className="form-control w-full ">
                                <div className="label">
                                    <span className="text-orange-500">Car Type</span>
                                </div>
                                <select
                                    {...register('types', { required: {
                                        value:true,
                                        message: "car Type must be Required"
                                    }})}
                                    className="select select-info text-slate-600  w-full"
                                >
                                    <option value="">Select Car Type</option>
                                    <option>SUV</option>
                                    <option>Sedan</option>
                                    <option>Hybrid</option>
                                </select>
                                {errors.types && (
                                    <p className="text-red-600 mt-2 font-semibold">{errors.types.message}</p>
                                )}
                            </div>
                            <div className="form-control w-full">
                                <input
                                    type="submit"
                                    value="search"
                                    className="btn btn-outline btn-warning mt-10 transition duration-300"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        {searchCriteria && <SearchResultBooking cars={cars}/>}
       </>
    );
};

export default HeroSection;
