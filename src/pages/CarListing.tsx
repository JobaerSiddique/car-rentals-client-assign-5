import { useState } from "react";
import CarFilter from "../components/CarListing/CarFilter";
import CarList from "../components/CarListing/CarList";
import { useGetCarsQuery } from "../redux/features/Cars/CarApi";
import LoadingPage from "./shared/LoadingPage";

interface Filters {
    types: string;
    minPrice: number;
    maxPrice: number;
}

const CarListing = () => {
    const [filters, setFilters] = useState<Filters>({
        types: '',
        minPrice: 0, // Initialize with a number
        maxPrice: 0, // Initialize with a number
    });

    const { data: cars, isLoading, error } = useGetCarsQuery(filters);

    const handleFilterChange = (newFilter: Filters) => {
        setFilters({
            ...newFilter,
            minPrice: Number(newFilter.minPrice),
            maxPrice: Number(newFilter.maxPrice),
        });
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div>
            <CarFilter filters={filters} onFilterChange={handleFilterChange} />
            <CarList cars={cars} isLoading={isLoading} error={error} />
        </div>
    );
};

export default CarListing;
