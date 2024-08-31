

const AddCar = () => {
    return (
        <div>
            <div className="text-center">
            <h1 className="lg:text-5xl md:text-2xl text-xl  my-10 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold  ">Car Rentals Management System</h1>
            </div>
            <h3 className="text-center my-8 font-semibold text-xl md:text-2xl lg:text-4xl">New Car Registration Form</h3>

            <div>
            <div className="card bg-base-100  shadow-xl">
                <div className="card-body">
                   
                    <form>
                       <div className= "flex justify-evenly items-center border border-cyan-600 p-10 rounded-3xl">
                        <div>
                        <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="label-text">Car Name</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full " />
</label>
<label className="form-control w-full my-5 ">
  <div className="label">
    <span className="label-text">Model</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full " />
  
</label>
<label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Price Per Hour</span>
  </div>
  <input 
  type="text" 
  placeholder="Type here" 
  className="input input-bordered w-full " />
  
</label>
 </div>
 <div>
                            
 <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="label-text">Year</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full " />

</label>
    <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="label-text">Color</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full " />
</label>
    <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Types</span>
  </div>
  <select className="select select-bordered">
    <option disabled selected>Select Types</option>
    <option>SUV</option>
    <option>Hybrid</option>
    <option>Sedan</option>
    
    
  </select>
</label>
                        </div>
                       </div>
                    </form>
                    
                </div>
</div>
            </div>
        </div>
    );
};

export default AddCar;