import { useFieldArray, useForm } from "react-hook-form";
import { useAddCarMutation } from "../../redux/features/Cars/CarApi";
import LoadingPage from "../../pages/shared/LoadingPage";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const AddCar = () => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const cloudPreset = import.meta.env.VITE_UPLOAD_PRESET
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState: { errors },reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features", // This will store the features as an array
  });

  const [addCar,{data,isLoading,error}] = useAddCarMutation()
console.log('add',data);
  if(isLoading) {
    return <LoadingPage/>
  }
  if(error){
    console.log(error);
   
  }
  
  const onSubmit = async (data) => {
    const file = data.file[0];

    // Create an image element to validate its dimensions
    const img = new Image();
    const fileReader = new FileReader();
    
    fileReader.onload = (e) => {
      img.src = e.target.result;

      img.onload = async () => {
        const { width, height } = img;
        
        // Check if the image dimensions are 500x500
        if (width === 500 && height === 500) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', cloudPreset);

          // Upload to Cloudinary
          fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
          })
            .then(res => res.json())
            .then(imageData => {
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
              addCar(newCar);
              toast("New Car Added Successfully");
              reset();
              navigate('/dashboard/admin/allCar')
            });
        } 
        else{
          toast.error("Image dimensions should be 500x500");
          return;
        }
      };
    };

    // Read the file as a Data URL to load it in the img element
    fileReader.readAsDataURL(file);
  };
  
   
  
  return (
        <div>
            <div className="text-center">
            <h1 className="lg:text-5xl md:text-2xl text-xl  my-10 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold  ">Car Rentals Management System</h1>
            </div>
            <h3 className="text-center my-8 font-semibold text-xl md:text-2xl lg:text-4xl">New Car Registration Form</h3>

 <div>
 <div className="card bg-base-100  shadow-xl ">
 <div className="card-body ">
                   
<form onSubmit={handleSubmit(onSubmit)}>
<div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols border border-cyan-500 rounded-3xl  p-10  gap-8">
<div>
<label className="form-control w-full my-5 ">
  <div className="label">
    <span className="font-bold">Car Name <span className="text-red-600">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Car Model Number" 
  {...register("name", { required: {
    value:true,
    message:"Car Name must be Required"
  }})}
  className="input input-bordered w-full " />
  {errors.name?.type === "required" && (
  <p className="text-red-600 font-bold mt-3">{errors?.name?.message}</p>
  )}
</label>
<label className="form-control w-full my-5 ">
<div className="label">
    <span className="font-bold">Model <span className="text-red-600">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Car Model" 
  {...register("model", { required: {
    value:true,
    message:"Car Model must be Required"
  }})}
  className="input input-bordered w-full " />
  {errors.model?.type === "required" && (
  <p className="text-red-600 font-bold mt-3">{errors?.model?.message}</p>
  )}
</label>
<label className="form-control w-full ">
  <div className="label">
    
  <span className="font-bold">Price Per Hour <span className="text-red-600">*</span></span>
  </div>
  <input 
  type="number" 
  placeholder="Enter Price Per Hour" 
  {...register("pricePerHour", { required: {
    value:true,
    message:"Car Price must be Required"
  }})}
  className="input input-bordered w-full " />
  {errors.pricePerHour?.type === "required" && (
  <p className="text-red-600 font-bold mt-3">{errors?.pricePerHour?.message}</p>
  )}
</label>
<label className="form-control w-full my-5">
  <div className="label">
    <span className="font-bold">IsElectric</span>
  </div>
  <select 
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
                    {...register(`features.${index}.value`, {
                      required: {
                        value: true,
                        message: "Feature must be Required",
                      },
                    })}
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
              {errors.features?.type === "required" && (
                <p className="text-red-600 font-bold mt-3">
                  {errors?.features?.message}
                </p>
              )}
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
  {...register("year", { required: {
    value:true,
    message:"car Year must be Required"
  }})}
  className="input input-bordered w-full " />
{errors.year?.type === "required" && (
  <p className="text-red-600 font-bold mt-3">{errors?.year?.message}</p>
  )}
</label>
    <label className="form-control w-full my-5 ">
  <div className="label">
  <span className="font-bold">Color <span className="text-red-600">*</span></span>
  </div>
  <input 
  type="text" 
  placeholder="Enter Car Color" 
  {...register("color", { required: {
    value:true,
    message:"car color must be Required"
  }})}
  className="input input-bordered w-full " />
  {errors.color?.type === "required" && (
  <p className="text-red-600 font-bold mt-3">{errors?.color?.message}</p>
  )}
</label>
  <label className="form-control w-full ">
  <div className="label">
    <span className="font-bold">Types <span className="text-red-600">*</span></span>
  </div>
  <select 
   {...register("types", { required: {
    value:true,
    message:"Car types must be Required"
  }})}
  className="select select-bordered">
  <option disabled selected>Select Types</option>
  <option>SUV</option>
  <option>Hybrid</option>
  <option>Sedan</option>
    
    
  </select>
  {errors.types?.type === "required" && (
  <p className="text-red-600 font-bold mt-3">{errors?.types?.message}</p>
  )}
</label>
    <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="font-bold">Description <span className="text-red-600">*</span></span>
  </div>
  <textarea 
  className="textarea textarea-bordered h-auto" 
  placeholder="Enter Car Description"
  {...register("description", { required: {
    value:true,
    message:"Description must be Required"
  }})}
  />
  {errors.description?.type === "required" && (
  <p className="text-red-600 font-bold my-5">{errors?.description?.message}</p>
  )}
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
                        </div>
                    
   </div>
  <label className="form-control w-full my-5 ">
  <div className="label">
    <span className="font-bold">Image <span className="text-red-600">*</span></span>
  </div>
  <input type="file" 
  {...register("file", { required: {
    value:true,
    message:"Photo must be Required"
  }})}
  className="file-input file-input-bordered file-input-info w-full " />
   {errors.file?.type === "required" && (
                <p className="text-red-600 font-bold mt-3">
                  {errors?.file?.message}
                </p>
              )}
</label>
                     <input type="submit" value="Submit" className="btn btn-outline btn-info w-full mt-5" />
                    </form>
                    
                </div>
</div>
            </div>
        </div>
    );
};

export default AddCar;