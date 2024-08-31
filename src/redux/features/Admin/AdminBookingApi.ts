import { baseApi } from "../../api/baseApi";



const AdminBookingApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getBookingSummery : builder.query({
            query:()=>({
                url:'/bookings/summery',
                method:"GET"
            })
        })
    })
})






export const {useGetBookingSummeryQuery} = AdminBookingApi