

const CarFilter = ({filters,onFilterChange}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      maxPrice: Number(e.target.value),
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
            <option value="suv">SUV</option>
            <option value="hybrid">Hybrid</option>
            <option value="sedan">Sedan</option>
          </select>
          <div className="w-full md:w-2/3">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="range range-info w-full"
              step="50"
            />
            <div className="text-center mt-2 text-lg font-semibold">
              Selected Price: ${filters.maxPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default CarFilter;