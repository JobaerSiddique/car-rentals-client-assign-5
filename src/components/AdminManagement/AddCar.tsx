import { useFieldArray, useForm } from "react-hook-form";
import { useAddCarMutation } from "../../redux/features/Cars/CarApi";
import LoadingPage from "../../pages/shared/LoadingPage";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const cloudPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features", 
  });

  const [addCar, { data, isLoading, error }] = useAddCarMutation();
  console.log('add', data);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    console.log(error);
  }
  
  const onSubmit = async (data) => {
    const file = data.file[0];

    const img = new Image();
    const fileReader = new FileReader();
    
    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        img.src = result;

        img.onload = async () => {
          const { width, height } = img;
          
          if (width === 500 && height === 500) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', cloudPreset);

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
                  childSeat: data.childSeat === "Yes",
                  isFeatured: data.isFeatured === "Yes",
                  location: data.location
                };
                addCar(newCar);
                toast("New Car Added Successfully");
                reset();
                navigate('/dashboard/admin/allCar')
              });
          } else {
            toast.error("Image dimensions should be 500x500");
            return;
          }
        };
      }
    };

    // Read the file as a Data URL to load it in the img element
    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="lg:text-5xl md:text-2xl text-xl my-10 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-bold">
          Car Rentals Management System
        </h1>
      </div>
      <h3 className="text-center my-8 font-semibold text-xl md:text-2xl lg:text-4xl">New Car Registration Form</h3>

      <div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols border border-cyan-500 rounded-3xl p-10 gap-8">
                
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Car Name <span className="text-red-600">*</span></span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Car name" 
                    {...register("name", { required: {
                      value: true,
                      message: "Car Name must be Required"
                    }})}
                    className="input input-bordered w-full"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.name?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Car Model <span className="text-red-600">*</span></span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Car Model Number" 
                    {...register("model", { required: {
                      value: true,
                      message: "Car Model must be Required"
                    }})}
                    className="input input-bordered w-full"
                  />
                  {errors.model?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.model?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Year <span className="text-red-600">*</span></span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="Enter Car Model Number" 
                    {...register("year", { required: {
                      value: true,
                      message: " Car Year must be Required"
                    }})}
                    className="input input-bordered w-full"
                  />
                  {errors.year?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.year?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Price Per Hour <span className="text-red-600">*</span></span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="Enter Car Model Number" 
                    {...register("pricePerHour", { required: {
                      value: true,
                      message: "price must be Required"
                    }})}
                    className="input input-bordered w-full"
                  />
                  {errors.pricePerHour?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.pricePerHour?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Location <span className="text-red-600">*</span></span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Car location" 
                    {...register("location", { required: {
                      value: true,
                      message: "location must be Required"
                    }})}
                    className="input input-bordered w-full"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.location?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Color <span className="text-red-600">*</span></span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Car Model Number" 
                    {...register("color", { required: {
                      value: true,
                      message: "Color must be Required"
                    }})}
                    className="input input-bordered w-full"
                  />
                  {errors.color?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.color?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Types <span className="text-red-600">*</span></span>
                  </div>
                  <select {...register("types", { required: {
                      value: true,
                      message: "Car Types be Required"
                    }})} className="select select-info w-full ">
  <option disabled selected>Select Types</option>
  <option>Sedan</option>
  <option>SUV</option>
  <option>Hybrid</option>
</select>
                  
                  {errors.types?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.types?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">IsElectric <span className="text-red-600">*</span></span>
                  </div>
                  <select {...register("isElectric", { required: {
                      value: true,
                      message: "Car Types be Required"
                    }})} className="select select-info w-full ">
  <option disabled selected>Select Electric</option>
  <option>Yes</option>
  <option>No</option>
  
</select>
                  
                  {errors.types?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.types?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Gps<span className="text-red-600">*</span></span>
                  </div>
                  <select {...register("gps", { required: {
                      value: true,
                      message: "Car Types be Required"
                    }})} className="select select-info w-full ">
  <option disabled selected>Select Gps</option>
  <option>Yes</option>
  <option>No</option>
  
</select>
                  
                  {errors.types?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.types?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Child Seat <span className="text-red-600">*</span></span>
                  </div>
                  <select {...register("childSeat", { required: {
                      value: true,
                      message: "Car Types be Required"
                    }})} className="select select-info w-full ">
  <option disabled selected>Select Child Seat</option>
  <option>Yes</option>
  <option>No</option>
  
</select>
                  
                  {errors.types?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.types?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">IsFeatured <span className="text-red-600">*</span></span>
                  </div>
                  <select {...register("isFeatured", { required: {
                      value: true,
                      message: "Car Types be Required"
                    }})} className="select select-info w-full ">
  <option disabled selected>Select isFeatured</option>
  <option>Yes</option>
  <option>No</option>
  
</select>
                  
                  {errors.types?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.types?.message)}</p>
                  )}
                </label>
                <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Description <span className="text-red-600">*</span></span>
                  </div>
                  <textarea {...register("description", { required: {
                      value: true,
                      message: "Description must  be Required"
                    }})} className="textarea textarea-info w-full h-20 ">
  
  
</textarea>
                  
                  {errors.description?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">{String(errors?.description?.message)}</p>
                  )}
                </label>
                
                
                

                <div className="my-5">
                  <div className="label">
                    <span className="font-bold">Features <span className="text-red-600">*</span></span>
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
                      {String(errors?.features?.message)}
                    </p>
                  )}
                </div>
                
               

                

            
              </div>
              <label className="form-control w-full my-5">
                  <div className="label">
                    <span className="font-bold">Image <span className="text-red-600">*</span></span>
                  </div>
                  <input 
                    type="file" 
                    {...register("file", { required: {
                      value: true,
                      message: "Photo must be Required"
                    }})}
                    className="file-input file-input-bordered file-input-info w-full"
                  />
                  {errors.file?.type === "required" && (
                    <p className="text-red-600 font-bold mt-3">
                      {String(errors?.file?.message)}
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
