import { useForm } from "react-hook-form";
import { useGetUpdateProfileMutation } from "../../redux/features/Users/UserApi";
import { toast } from "sonner";
import LoadingPage from "../../pages/shared/LoadingPage";
import { useState } from "react";


const UpdateUserModel = ({user}) => {
   const [update,{data,isLoading,isSuccess,error} ]=useGetUpdateProfileMutation()
   const [image,setImage] = useState('')
const cloudName = import.meta.env.VITE_CLOUD_NAME
const cloudPreset = import.meta.env.VITE_UPLOAD_PRESET
console.log(data);
    const {register,formState: { errors }, handleSubmit} = useForm()
    const onSubmit = (data) => {
      const file = data.file ? data.file[0] : null;
      const formData = new FormData();
    
      if (file) {
        formData.append('file', file);
        formData.append('upload_preset', cloudPreset);
    
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData
        })
        .then(res => res.json())
        .then(imageData => {
          const image = imageData.secure_url;
          const updatedUser = {
            name: data.name,
           
            phone: data.phone,
            image,
            address: data.address
          };
          console.log({ updatedUser });
          update(updatedUser).unwrap();
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
      } else {
        const updatedUser = {
          name: data.name,
          
          phone: data.phone,
          address: data.address
        };
        console.log({ updatedUser });
        update(updatedUser).unwrap();
      }
    };

    if(isSuccess){
      toast.success("user uploaded successfully")
    }
    if(isLoading){
      return <LoadingPage/>
    }
    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
  <label  htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
   <div className="text-center my-5">
   <h1 className=" text-xl lg:text-2xl font-semibold bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">Update User Information</h1>
   </div>

   <form onSubmit={handleSubmit(onSubmit)} >
    {/* main div */}
    <div className="flex justify-between gap-6">
      <div>
  <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">Name</span>
  </div>
  <input type="text" 
  defaultValue={user?.name}
  placeholder="Enter Your Name" 
  {...register("name")}
  className="input input-bordered w-full " />
</label>
  <label className="form-control w-full mt-3 ">
  <div className="label">
    <span className="label-text">Email</span>
  </div>
  <input type="text" 
  disabled
  defaultValue={user?.email}
  placeholder="Enter Your Email" 
  {...register("email")}
  className="input input-bordered w-full " />
</label>
      </div>

      {/* 2nd */}
      <div >
      <label className="form-control w-full ">
  <div className="label">
    <span className="label-text">phone</span>
  </div>
  <input type="text" 
  placeholder="Enter Your phone" 
  defaultValue={user?.phone}
  {...register("phone")}
  className="input input-bordered w-full " />
</label>
      <label className="form-control w-full  mt-3">
  <div className="label">
    <span className="label-text">Role</span>
  </div>
  <input type="text" 
  disabled
  defaultValue={user?.role}
  placeholder="" 
  className="input input-bordered w-full " />
</label>
      </div>
    </div>
    <div className="mt-5">
    <label className="form-control">
  <div className="label">
    <span className="label-text">Address</span>
  </div>
  <textarea 
  className="textarea textarea-bordered h-auto"
  {...register("address")} 
  placeholder="Enter Your briefly Address here"></textarea>
</label>

    
    </div>
    <label className="form-control my-5">
  <div className="label">
    <span className="label-text">Image</span>
  </div>
  <input 
  {...register("file", )}
  type="file"
   className="file-input file-input-bordered file-input-info w-full " />
</label>
   
    <input type="submit" value="Update User" className="btn btn-outline btn-info w-full mt-5" />
   </form>
 
    
    
  </div>
</div>
        </div>
    );
};

export default UpdateUserModel;