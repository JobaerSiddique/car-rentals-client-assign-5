import { useForm } from "react-hook-form";



const SearchBooking = ({onSearch}) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        
        onSearch(data);
    };
  
   
   
    return (
        <div className="my-8">
            
            <div className="card bg-base-100 w-[80%] shadow-2xl container mx-auto ">
  <div className="card-body">
    
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-4 gap-4  justify-center items-center">
    {/* 11 */}
   
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Car Types</span>
  </div>
  <select 
   {...register("types")} 
  className="select select-bordered">
    <option value=''>All Types</option>
    <option>SUV</option>
    <option>Hybrid</option>
    <option>Sedan</option>
   
  </select>
</label>
    

  
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Min price</span>
  </div>
  <input 
  type="number" 
  {...register("minPrice")} 
  className="input input-info "
   />
</label>
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Max price</span>
  </div>
  <input 
  type="number" 
  {...register("maxPrice")} 
  className="input input-info "
   />
</label>
    <label className="form-control w-full ">
    <div className="label">
    <span className="label-text"></span>
  </div>
<input type="submit" className="btn btn-primary mt-4" value="Search" />
</label>

    

     

      

    </div>
    </form>
    
  </div>
</div>
        </div>
    );
};

export default SearchBooking;