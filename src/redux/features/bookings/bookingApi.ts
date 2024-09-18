
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
        providesTags: ['Bookings']
    
       }),
       deleteBookings : builder.mutation({
        query:(id)=>({
            url:`bookings/${id}`,
            method:"DELETE",
        }),
        invalidatesTags: ['Bookings']
       }),
       createBooking : builder.mutation({
        query:(book)=>({
            url:"/bookings",
            method:"POST",
            body:book,
        }),
        invalidatesTags: ['Bookings'],
       }),
       getAllBooking: builder.query({
        query:()=>({
            url:"/bookings/all-bookings",
            method:"GET",
        }),
        providesTags: ['Bookings']
       }),
       getApprove: builder.mutation({
        query:(id)=>({
            url:`/bookings/approve/${id}`,
            method:"PUT",
        }),
        invalidatesTags: ['Bookings'], 
       }),
       getReturnCar: builder.mutation({
        query:(data)=>({
            url:'/cars/return',
            method:"PUT",
            body:data,
        }),
        invalidatesTags: ['Bookings'],
       }),
       updateBooking: builder.mutation({
        query:({id,data})=>({
            url:`/bookings/updateBooking/${id}`,
            method:"PUT",
            body:data,
        }),
        invalidatesTags: ['Bookings'],    
        
       }),
       reportGenerate: builder.query({
        query:(report)=>({
            url:`/bookings/report?report=${report}`,
            method:"GET",
        })
       })
    

    })
})


export const {useGetBookingsQuery,useGetSingleBookingsQuery,useDeleteBookingsMutation,useCreateBookingMutation, useGetAllBookingQuery, useGetApproveMutation,useGetReturnCarMutation,useUpdateBookingMutation, useReportGenerateQuery} = bookingApi;