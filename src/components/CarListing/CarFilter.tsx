import React from 'react';


interface Filters {
  types: string;
  minPrice: number;
  maxPrice: number;
}


type OnFilterChange = (filters: Filters) => void;

// Define the props type for CarFilter
interface CarFilterProps {
  filters: Filters;
  onFilterChange: OnFilterChange;
}

const CarFilter: React.FC<CarFilterProps> = ({ filters, onFilterChange }) => {
  console.log({ filters });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: Number(value), 
    });
  };

  return (
    <div className="card bg-base-100 w-full shadow-xl p-4">
      <div className="card-body">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <select
            className="select select-info w-full md:w-1/3"
            name="types"
            value={filters.types}
            onChange={handleChange}
          >
            <option value="">All Types</option>
            <option value="SUV">SUV</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Sedan">Sedan</option>
          </select>
          <div className="w-full md:w-2/3 flex gap-4">
            <input
              type="text"
              name="minPrice"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={handlePriceChange}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <input
              type="text"
              name="maxPrice"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFilter;
