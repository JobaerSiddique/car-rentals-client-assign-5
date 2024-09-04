
import Swal from "sweetalert2";
import LoadingPage from "../../../pages/shared/LoadingPage";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/features/Admin/AdminUser";
import { useState } from "react";



const AdminAllUser = () => {
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState()
    const {data:users=[],isLoading,isError} = useGetAllUsersQuery({page,limit})
    const [updateAdmin,{isLoading:updateLoading,error}] = useUpdateUserMutation()
    const [deleteUser,{isLoading:deleteLoading,error:deleteError}] = useDeleteUserMutation()
console.log(users?.data?.result);
    const handleUpdate = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this user to Admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateAdmin(id); // Unwrap to handle errors better
                    Swal.fire({
                        title: "Updated",
                        text: "The user's role has been updated to Admin.",
                        icon: "success"
                    });
                    
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: `${deleteError}`,
                        icon: "error"
                    });
                }
            }
        });
    };
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this user to Admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(id).unwrap(); // Unwrap to handle errors better
                    Swal.fire({
                        title: "Deleted",
                        text: "The user is Deleted",
                        icon: "success"
                    });
                    
                } catch (error) {
                    console.log("delete", error?.data?.message);
                    Swal.fire({
                        title: "Error!",
                        text: `${error?.data?.message}`,
                        icon: "error"
                    });
                }
            }
        });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
if(isLoading || updateLoading) {
    return <LoadingPage/>
}

if(isError) {
    console.log(isError);
}
if(error){
    console.log(error);
}
    return (
        <>
        <div>
       
            <div className="card glass w-full">
  <div className="card-body">
  <div className="overflow-x-auto">
  <table className="table table-zebra text-center">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>UserName</th>
        <th>Email</th>
        <th>role</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users?.data?.result?.map((user,index)=>(<tr className={user.isDelete ? "line-through text-red-500" : ""} key={user._id}>
            <th>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.phone}</td>
            
            <td className="flex justify-center items-center gap-5">
            
            {user.isDelete ? <button  disabled className="btn btn-outline border-purple-600 btn-sm">update</button>:<label onClick={()=>handleUpdate(user._id)} htmlFor="my_modal_6" className="btn btn-outline border-purple-600 btn-sm">update</label>}
                
           {user.isDelete? <button disabled className="btn btn-outline border-pink-600 btn-sm">Delete</button>: <button onClick={()=>handleDelete(user._id)} className="btn btn-outline border-pink-600 btn-sm">Delete</button>}
            </td>
          </tr>))
      }
      
      
     
    </tbody>
  </table>
</div>
  </div>
</div>
{/* pagination and limit */}
<div className="flex  justify-center gap-10">
      <div>
      <div className="join flex justify-center my-5">
                    {Array.from({ length: users?.data.totalPages }, (_, index) => (
                        <input
                            key={index + 1}
                            className="join-item btn btn-square"
                            type="radio"
                            name="options"
                            aria-label={` ${index + 1}`}
                            checked={page === index + 1}
                            onChange={() => handlePageChange(index + 1)}
                        />
                    ))}
                </div>
      </div>
      <div>
      <select onChange={(e) => setLimit(Number(e.target.value))} className="select select-info w-auto my-5">

  <option >10</option>
  <option>20</option>
  <option>50</option>
  <option>100</option>
</select>
      </div>
</div>

        </div>
      




        </>
    );
};

export default AdminAllUser;