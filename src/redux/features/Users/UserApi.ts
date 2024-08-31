import { baseApi } from "../../api/baseApi";


const UserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       getUser : builder.query({
        query:()=>({
            url:'auth/me',
            method:"GET"
        })
       })
    })
 
})


export const { useGetUserQuery } = UserApi;