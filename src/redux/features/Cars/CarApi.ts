import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query({
      query: ({ types, minPrice, maxPrice, location, startDate, endDate }) => {
        const params: any = {};
        if (types) params.types = types;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (location) params.location = location;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        return {
          url: "cars",
          method: "GET",
          params,
        };
      },
      providesTags: ['Car'],
    }),
    getCarsById: builder.query({
      query: (id) => ({
        url: `cars/${id}`,
        method: "GET",
      }),
      providesTags: ['Car'],
    }),
    addCar: builder.mutation({
      query: (newCar) => ({
        url: "cars",
        method: "POST",
        body: newCar,
      }),
      invalidatesTags: [{ type: 'Car', id: 'LIST' }],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Car', id: 'LIST' }],
    }),
    updateCar: builder.mutation({
      query:({id,data})=>({
        url:`cars/${id}`,
        method:"PUT",
        body:data
      }),
      invalidatesTags: [{ type: 'Car', id: 'LIST' }],
    })
  }),
});

export const {
  useGetCarsQuery,
  useGetCarsByIdQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation
} = carApi;
