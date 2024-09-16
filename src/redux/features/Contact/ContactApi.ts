import { baseApi } from "../../api/baseApi";



const contactApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createContact: builder.mutation({
            query:(data)=>({
                url:'/contact',
                method:"POST",
                body:data
            })
        })
    })
})


export const {useCreateContactMutation} = contactApi;