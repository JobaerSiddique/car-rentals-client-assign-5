
import LoadingPage from "../../../pages/shared/LoadingPage";
import { useGetAllUsersQuery } from "../../../redux/features/Admin/AdminUser";



const AdminAllUser = () => {
    const {data:users=[],isLoading,isError} = useGetAllUsersQuery()
    

    const handleUpdate = ()=>{
        
    }
if(isLoading) {
    return <LoadingPage/>
}

if(isError) {
    console.log(isError);
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
        users?.data?.map((user,index)=>(<tr key={user._id}>
            <th>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.phone}</td>
            <td className="flex justify-center items-center gap-5">
            <label onClick={handleUpdate} htmlFor="my_modal_6" className="btn btn-outline border-purple-600 btn-sm">update</label>
                
                <button className="btn btn-outline border-pink-600 btn-sm">Delete</button>
            </td>
          </tr>))
      }
      
      
     
    </tbody>
  </table>
</div>
  </div>
</div>
        </div>
      




        </>
    );
};

export default AdminAllUser;