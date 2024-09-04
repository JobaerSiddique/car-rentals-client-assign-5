import { baseApi } from "../../api/baseApi";


const UserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       getUser : builder.query({
        query:()=>({
            url:'auth/me',
            method:"GET"
        }),
        providesTags: ['User']
       }),
       getUpdateProfile : builder.mutation({
        query:(user)=>({
            url:`auth/update-profile`,
            method:"PUT",
            body:user
        }),
        invalidatesTags: ['User']
       })
    })
 
})


export const { useGetUserQuery,useGetUpdateProfileMutation } = UserApi;