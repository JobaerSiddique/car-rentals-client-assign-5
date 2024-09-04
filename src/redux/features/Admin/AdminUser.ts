import { baseApi } from "../../api/baseApi";





const AdminUser = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getAllUsers : builder.query({
            query:({page,limit})=>({
                url:`auth/allUser?page=${page}&limit=${limit}`,
                method:"GET"
            }),
            providesTags: ['User']
        }),
        updateUser : builder.mutation({
            query:(id)=>({
                url:`auth/updateUser/${id}`,
                method:"PUT"
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query:(id)=>({
                url:`auth/deleteUser/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ['User']
        })
    })
})


export const {useGetAllUsersQuery,useUpdateUserMutation,useDeleteUserMutation} = AdminUser;