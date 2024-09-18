import { useDeleteCarMutation, useGetCarsQuery } from "../../../redux/features/Cars/CarApi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

import Swal from "sweetalert2";
import LoadingPage from "../../../pages/shared/LoadingPage";
import { useState } from "react";
import UpdateCarModel from "../../Modal/UpdateCarModel";

const AllCars = () => {
    const {data,refetch} = useGetCarsQuery({})
    const [carUpdate,setCarUpdate] = useState(false)
    const [updateCar,setUpdateCar] = useState("")
  const [deleteCar,{isLoading}] = useDeleteCarMutation()
    
  const handleCarUpdate = (data)=>{
    setCarUpdate(true);
    setUpdateCar(data)
    
  }
  
  const handleCarDelete = async (id)=>{
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    });

    // If the user confirmed, proceed with the booking
    if (result.isConfirmed) {
        try {
         
            
            // Call the createBooking mutation
            const res = await deleteCar(id).unwrap();

            if(res.success){
                Swal.fire({
                    title: "Success!",
                    text: `${res.message}`,
                    icon: "success"
                });
                refetch()
              
            }
            
       

        } catch (err) {
            
            console.error(err);
            Swal.fire({
                title: "Error!",
                text: `${err.data.message}`,
                icon: "error"
            });
        }
    }
    }
    if(isLoading){
      return <LoadingPage/>
    }
    return (
        <>
       <div>
            <h1 className="text-center text-3xl font-bold uppercase my-10">All Cars Information </h1>
        
    <div className="card glass w-full">
  
  <div className="card-body">
  <div className="overflow-x-auto">
  <table className="table text-center">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Year</th>
        <th>Color</th>
        <th>Types</th>
        <th>pricePerHour</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        data?.data?.map(car=> <tr className={car?.isDeleted? "line-through text-red-500":""}>
        
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={car.image}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold dark:text-white">{car.name}</div>
                  <div className="text-sm opacity-50">{car.model}</div>
                </div>
              </div>
            </td>
            <td className="dark:font-semibold light:font-bold">{car.year}</td>
            <td className="dark:font-semibold light:font-bold">{car.color}</td>
            <td className="dark:font-semibold light:font-bold">{car.types}</td>
            <td className="text-orange-500 font-bold">$ {car.pricePerHour}</td>
            <td>{car.status === 'available'? <p className="text-green-600 font-bold">{car.status}</p>:<p className="text-red-600 font-bold">{car.status}</p>}</td>
            <td className="flex justify-center items-end gap-5">
            {car.isDeleted ? (
    <label 
      className="btn btn-outline btn-warning btn-sm cursor-not-allowed opacity-50" 
      onClick={(e) => e.preventDefault()} 
    >
      <FaRegEdit />
    </label>
  ) : (
    <label 
      htmlFor="my_modal_6" 
      onClick={() => handleCarUpdate(car)} 
      className="btn btn-outline btn-warning btn-sm"
    >
      <FaRegEdit />
    </label>
  )}
            
                
                <button disabled={car.isDeleted} onClick={()=>handleCarDelete(car._id)} className="btn btn-outline btn-error btn-sm"><RiDeleteBinFill /></button>
            </td>
          </tr>)
      }
     
    
     
    
      
    </tbody>
  </table>
</div>
  </div>
</div>

            
        </div> 

        {carUpdate &&  <UpdateCarModel car={updateCar}/>}
        
        </>
    );
};

export default AllCars;