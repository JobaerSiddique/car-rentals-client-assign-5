import { baseApi } from "../../api/baseApi";



const reviewApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createReview : builder.mutation({
            query:(review)=>({
                url:'/reviews',
                method:"POST",
                body:review
            }),
           
            invalidatesTags:['Review']
        }),
       getReview : builder.query({
        query:()=>({
            url:'/reviews',
            method:"GET"
        })
       })
    })
})


export const {useCreateReviewMutation, useGetReviewQuery} = reviewApi;