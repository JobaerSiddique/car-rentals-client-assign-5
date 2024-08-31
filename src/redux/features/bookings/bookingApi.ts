import { baseApi } from "../../api/baseApi";


const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        
       getBookings : builder.query({
        query:()=>({
            url:"bookings/my-bookings",
            method:"GET",
            
        }),
       
       }),
       
       getSingleBookings: builder.query({
        query:(id)=>({
            url:`/bookings/${id}`,
            method:"GET",
        })
            
    
       }),
       deleteBookings : builder.mutation({
        query:(id)=>({
            url:`/bookings/${id}`,
            method:"DELETE",
        })
       })

    })
})


export const {useGetBookingsQuery,useGetSingleBookingsQuery,useDeleteBookingsMutation} = bookingApi;