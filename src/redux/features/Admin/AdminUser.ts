import { baseApi } from "../../api/baseApi";





const AdminUser = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getAllUsers : builder.query({
            query:()=>({
                url:'auth/allUser',
                method:"GET"
            })
        })
    })
})


export const {useGetAllUsersQuery} = AdminUser;