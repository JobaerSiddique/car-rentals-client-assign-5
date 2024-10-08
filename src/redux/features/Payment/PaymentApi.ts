import { baseApi } from "../../api/baseApi";




const PaymentApi= baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createPayment : builder.mutation({
            query:(id)=>({
                url:`payment/create-payment/${id}`,
                method:"POST",
               
            })
        }),
        getPaymentInfo : builder.query({
            query:(id)=>({
                url:`payment/paymentInfo/${id}`,
                method:"GET"
            })
        }),
        getPaymentHistory : builder.query({
            query:()=>({
                url:"/payment",
                method:"GET"
            })
        })
    })
})

export const {useCreatePaymentMutation,useGetPaymentInfoQuery,useGetPaymentHistoryQuery} = PaymentApi

 