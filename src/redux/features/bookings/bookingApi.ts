import { baseApi } from "../../api/baseApi";


const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        
       getBookings : builder.query({
        query:()=>({
            url:"bookings/my-bookings",
            method:"GET",
            
        }),
        providesTags: ['Bookings']
       }),
       
       getSingleBookings: builder.query({
        query:(id)=>({
            url:`/bookings/${id}`,
            method:"GET",
        }),
        providesTags: (result, error, id) => [{ type: 'Bookings', id }] 
    
       }),
       deleteBookings : builder.mutation({
        query:(id)=>({
            url:`/bookings/${id}`,
            method:"DELETE",
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Bookings', id }]
       })

    })
})


export const {useGetBookingsQuery,useGetSingleBookingsQuery,useDeleteBookingsMutation} = bookingApi;