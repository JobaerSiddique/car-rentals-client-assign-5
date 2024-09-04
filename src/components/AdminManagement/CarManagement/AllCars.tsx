import { useGetCarsQuery } from "../../../redux/features/Cars/CarApi";



const AllCars = () => {
    const {data} = useGetCarsQuery({})
 

    console.log(data?.data);
    return (
        <div>
            <h1 className="text-center text-3xl font-bold uppercase">All Cars Information </h1>
            <div style={{
    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
    backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "15px" // Adjust the opacity value here
}}>
    <div className="card glass w-full">
  
  <div className="card-body">
  <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
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
                  <div className="font-bold">{car.name}</div>
                  <div className="text-sm opacity-50">{car.model}</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>)
      }
     
    
     
    
      
    </tbody>
  </table>
</div>
  </div>
</div>

            </div>
        </div>
    );
};

export default AllCars;