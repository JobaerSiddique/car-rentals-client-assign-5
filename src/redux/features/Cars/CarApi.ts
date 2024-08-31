import { baseApi } from "../../api/baseApi";


const carApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getCars : builder.query({
            query: ({ types, minPrice, maxPrice, isElectric }) => ({
                
                url:"cars",
                method:"GET",
                params:{
                    types,
                    minPrice,
                    maxPrice,
                    isElectric
                }
            })
                
            
        }),
        getCarsById : builder.query({
            query:(id)=>({
                url:`cars/${id}`,
                method:"GET"
            })
        })
    })
})

export const {useGetCarsQuery,useGetCarsByIdQuery} = carApi