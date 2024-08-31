import { baseApi } from "../../api/baseApi";




const PaymentApi= baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createPayment : builder.mutation({
            query:(id)=>({
                url:`payment/create-payment/${id}`,
                method:"POST",
               
            })
        })
    })
})

export const {useCreatePaymentMutation} = PaymentApi

 