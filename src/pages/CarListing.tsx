import { useState } from "react";
import CarFilter from "../components/CarListing/CarFilter";
import CarList from "../components/CarListing/CarList";
import { useGetCarsQuery } from "../redux/features/Cars/CarApi";
import LoadingPage from "./shared/LoadingPage";
import { toast } from "sonner";



const CarListing = () => {
    const [filters, setFilters] = useState({
        types: '',
        minPrice: '',
        maxPrice: 2000,
      });
    const {data:cars,isLoading,error}= useGetCarsQuery(filters)
    
    const handleFilterChange = (newFilter)=>{
        setFilters(newFilter)
    
    }
 
    if(isLoading){
        return <LoadingPage/>
    }
   
    return (
        <div >
            <CarFilter filters={filters} onFilterChange={handleFilterChange}/>
            <CarList cars={cars} isLoading={isLoading} error={error}/>
        </div>
    );
};

export default CarListing;