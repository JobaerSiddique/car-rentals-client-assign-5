

const CarFilter = ({filters,onFilterChange}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        onFilterChange({
          ...filters,
          [name]: value,
        });
      };

      const handlePriceChange = (e) => {
        onFilterChange({
          ...filters,
          minPrice: 0,
          maxPrice: Number(e.target.value),
        });
      };
    
    return (
        <div>
      
      <div className="flex flex-row-reverse ">
      <select className="select select-info w-full max-w-xs" name="types" value={filters.types} onChange={handleChange}>
        <option value="">All Types</option>
        <option value="suv">SUV</option>
        <option value="hybrid">Hybrid</option>
        <option value="sedan">Sedan</option>
      </select>
      <input
        type="range"
        min="0"
        max="1000"
        value={filters.maxPrice}
        onChange={handlePriceChange}
        className="range range-info ml-2"
        step="50"
      />
      
      
      
      <select className="select select-info w-full max-w-xs" name="isElectric" value={filters.isElectric} onChange={handleChange}>
        <option value="">All</option>
        <option value="true">Electric</option>
        <option value="false">Non-Electric</option>
      </select>
    </div>
        </div>
    );
};

export default CarFilter;