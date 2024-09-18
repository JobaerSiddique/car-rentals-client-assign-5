import { useFieldArray, useForm } from "react-hook-form";
import { useUpdateCarMutation } from "../../redux/features/Cars/CarApi";
import { toast } from "sonner";



const UpdateCarModel = ({car}) => {
 
  const { register, control, handleSubmit,reset } = useForm();
  const [updateCar]=useUpdateCarMutation()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features", 
  });

  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const cloudPreset = import.meta.env.VITE_UPLOAD_PRESET


  const onSubmit = async (data) => {
    if (data.file && data.file.length > 0) {
      const file = data.file[0];
      if (file instanceof Blob) {
        const img = new Image();
        const fileReader = new FileReader();
  
        fileReader.onload = (e) => {
          // Type guard to check if result is a string
          const result = e.target.result;
          if (typeof result === 'string') {
            img.src = result;
  
            img.onload = async () => {
              const { width, height } = img;
  
              if (width === 500 && height === 500) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', cloudPreset);
  
                try {
                  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData
                  });
                  const imageData = await response.json();
                  const image = imageData.secure_url;
                  const newCar = {
                    name: data.name,
                    image,
                    color: data.color,
                    year: data.year,
                    pricePerHour: parseInt(data.pricePerHour),
                    features: data.features.map((feature) => feature.value),
                    description: data.description,
                    model: data.model,
                    types: data.types,
                    isElectric: data.isElectric === "Yes",
                    gps: data.gps === "Yes",
                    childSeat: data.childSeat === "Yes"
                  };
                  const res = await updateCar({ id: car.id, data: newCar }).unwrap();
                  console.log(res);
                  if(res.success){
                    toast(res.message)
                    reset();
                  }
                } catch (error) {
                  console.error('Image upload failed:', error);
                }
              } else {
                const newCar = {
                  name: data.name,
                  color: data.color,
                  year: data.year,
                  pricePerHour: parseInt(data.pricePerHour),
                  features: data.features.map((feature) => feature.value),
                  description: data.description,
                  model: data.model,
                  types: data.types,
                  isElectric: data.isElectric === "Yes",
                  gps: data.gps === "Yes",
                  childSeat: data.childSeat === "Yes"
                };
                const res = await updateCar({ id: car.id, data: newCar }).unwrap();
                console.log({res});
                if(res.success){
                  toast(res.message)
                  reset();
                }
              }
            };
          } else {
            console.error('Image load failed. Result is not a string.');
          }
        };
  
        fileReader.readAsDataURL(file);
      } else {
        console.error('Selected file is not valid.');
      }
    } else {
      // Handle cases where no file is selected
      const newCar = {
        name: data.name,
        color: data.color,
        year: data.year,
        pricePerHour: parseInt(data.pricePerHour),
        features: data.features.map((feature) => feature.value),
        description: data.description,
        model: data.model,
        types: data.types,
        isElectric: data.isElectric === "Yes",
        gps: data.gps === "Yes",
        childSeat: data.childSeat === "Yes"
      };
      updateCar({ id: car._id, data: newCar });
    }
  };
  return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
  <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
  <div className="card bg-base-100 w-auto shadow-2xl mt-5 ">
 <div className="card-body ">
    <h1 className="text-center text-orange-600 font-extrabold my-5 text-xl">Update Car Information</h1>       
<form onSubmit={handleSubmit(onSubmit)}>
<div className= "grid grid-cols-1 border border-cyan-500 rounded-3xl  p-10  gap-8">
<div>
<label className="form-control w-full my-5 ">
  <div className="label">
    <span className="font-bold">Car Name </span>
  </div>
  <input 
  type="text" 
  defaultValue={car.name}
  placeholder="Enter Car Model Number" 
  {...register("name")}
  className="input input-bordered w-full " />
  
</label>
<label className="form-control w-full my-5 ">
<div className="label">
    <span className="font-bold">Model </span>
  </div>
  <input 
  type="text" 
  defaultValue={car.model}
  placeholder="Enter Car Model" 
  {...register("model")}
  className="input input-bordered w-full " />
  
</label>
<label className="form-control w-full ">
  <div className="label">
    
  <span className="font-bold">Price Per Hour <span className="text-red-600">*</span></span>
  </div>
  <input 
  type="number" 
  defaultValue={car.pricePerHour} 
  placeholder="Enter Price Per Hour" 
  {...register("pricePerHour")}
  className="input input-bordered w-full " />
  
</label>
<label className="form-control w-full my-5">
  <div className="label">
    <span className="font-bold">IsElectric</span>
  </div>
  <select 
   defaultValue={car.isElectric}
  {...register("electric", {
    
  })}
  className="select select-bordered">
   
  <option disabled selected>Select Electric</option>
  <option>Yes</option>
  <option>No</option>
 
    
    
  </select>
  
</label>
<label className="form-control w-full my-5">
  <div className="label">
    <span className="font-bold">Gps </span>
  </div>
  <select 
  defaultValue={car.gps}
  {...register("gps", {
    
  })}
  
  className="select select-bordered">
  <option disabled selected>Select gps</option>
  <option>Yes</option>
  <option>No</option>
 
    
    
  </select>
  
</label>
<label className="form-control w-full my-5">
  <div className="label">
    <span className="font-bold">ChildSeat </span>
  </div>
  <select 
  {...register("childSeat", {
    
  })}
  className="select select-bordered">
  <option disabled selected>Select ChildSeat</option>
  <option>Yes</option>
  <option>No</option>
 
    
    
  </select>
 
</label>

<div className="my-5">
              <div className="label">
                <span className="font-bold">
                  Features <span className="text-red-600">*</span>
                </span>
              </div>
              {fields.map((item, index) => (
                <div key={item.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`features.${index}.value`)}
                    className="input input-bordered w-full"
                    placeholder="Enter a feature"
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline btn-info"
                onClick={() => append({ value: "" })}
              >
                Add Feature
              </button>
              
            </div>
 </div>
 <div>
                            
 <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="font-bold">Year <span className="text-red-600">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter car Model Year" 
  defaultValue={car.year}
  {...register("year")}
  className="input input-bordered w-full " />

</label>
    <label className="form-control w-full my-5 ">
  <div className="label">
  <span className="font-bold">Color <span className="text-red-600">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Car Color" 
  defaultValue={car.color}
  {...register("color")}
  className="input input-bordered w-full " />
  
</label>
  <label className="form-control w-full ">
  <div className="label">
    <span className="font-bold">Types <span className="text-red-600">*</span></span>
  </div>
  <select 
  defaultValue={car.types}
   {...register("types")}
  className="select select-bordered">
  <option disabled selected>Select Types</option>
  <option>SUV</option>
  <option>Hybrid</option>
  <option>Sedan</option>
    
    
  </select>
  
</label>
    <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="font-bold">Description <span className="text-red-600">*</span></span>
  </div>
  <textarea 
  className="textarea textarea-bordered h-auto" 
  placeholder="Enter Car Description"
  defaultValue={car.description} 
  {...register("description")}
  />
 
</label>

                        </div>
                    
   </div>
  <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="font-bold">Image <span className="text-red-600">*</span></span>
  </div>
  <input type="file" 
  {...register("file", )}
  className="file-input file-input-bordered file-input-info w-full " />
   
</label>
  <input type="submit" value="Submit" className="btn btn-outline btn-info w-full mt-5" />
    </form>
                    
                </div>
</div>
  </div>
</div>
        </div>
    );
};

export default UpdateCarModel;