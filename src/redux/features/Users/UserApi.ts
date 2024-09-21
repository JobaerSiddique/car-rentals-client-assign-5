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
       }),
       getUserStatus : builder.mutation({
        query:(id)=>({
            url:`/auth/userStatus/${id}`,
            method:"PUT"
        }),
        invalidatesTags: ['User']
       }),
       forgetPassword: builder.mutation({
        query:(data)=>({
            url:'/auth/forget-password',
            method:"POST",
            body:data,
        }),
        invalidatesTags: ['User']
       }),
       resetPassword:builder.mutation({
        query:({body,token})=>({
            url:'auth/reset-password',
            method:"POST",
            body:body,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        invalidatesTags: ['User']
       })
    })
 
})


export const { useGetUserQuery,useGetUpdateProfileMutation,useGetUserStatusMutation,useForgetPasswordMutation, useResetPasswordMutation} = UserApi;