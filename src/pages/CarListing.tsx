// @ts-ignore
import { useState } from "react";
import CarFilter from "../components/CarListing/CarFilter";
import CarList from "../components/CarListing/CarList";
import { useGetCarsQuery } from "../redux/features/Cars/CarApi";
import LoadingPage from "./shared/LoadingPage";

interface Filters {
    types: string;
    minPrice: string;
    maxPrice: string;
  }


const CarListing = () => {
    const [filters, setFilters] = useState<Filters>({
        types: '',
        minPrice: '',
        maxPrice: '',
      });
    const {data:cars,isLoading,error}= useGetCarsQuery(filters)
    
    const handleFilterChange = (newFilter: Filters)=>{
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