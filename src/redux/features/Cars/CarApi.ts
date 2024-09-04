import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query({
      query: ({ types, minPrice, maxPrice }) => {
        const params: any = {};
        if (types) params.types = types;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        return {
          url: "cars",
          method: "GET",
          params,
        };
      },
      providesTags: ['Car']
        
    }),
    getCarsById: builder.query({
      query: (id) => ({
        url: `cars/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'Car', id }],
    }),
    addCar: builder.mutation({
      query: (newCar) => ({
        url: "cars",
        method: "POST",
        body: newCar,
      }),
      invalidatesTags: [{ type: 'Car', id: 'LIST' }],
    }),
   
  }),
});

export const { useGetCarsQuery, useGetCarsByIdQuery, useAddCarMutation } = carApi;