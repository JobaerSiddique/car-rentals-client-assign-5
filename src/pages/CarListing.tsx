import { useState } from "react";
import CarFilter from "../components/CarListing/CarFilter";
import CarList from "../components/CarListing/CarList";
import { useGetCarsQuery } from "../redux/features/Cars/CarApi";
import LoadingPage from "./shared/LoadingPage";



const CarListing = () => {
    const[filters,setFilters]= useState({
        types:'',
        minPrice:'',
        maxPrice:'',
        isElectric:''
    })
    const {data:cars,error,isLoading}= useGetCarsQuery(filters)
    
    const handleFilterChange = (newFilter)=>{
        setFilters(newFilter)
        console.log(newFilter)
    }

    if(isLoading){
        return <LoadingPage/>
    }
    if(error){
        console.log(error?.message);
    }
    return (
        <div >
            <CarFilter filters={filters} onFilterChange={handleFilterChange}/>
            <CarList cars={cars} isLoading={isLoading} error={error}/>
        </div>
    );
};

export default CarListing;