import {PRODUCTS_URL} from "../constants";

import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
        query: () => ({
            url: PRODUCTS_URL
        }),
        providesTags: ["Products"],
        keepUnusedDataFor: 5
    }),

    getProduct: builder.query({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`
        }),
        keepUnusedDataFor: 5
    }),

    createProduct: builder.mutation({
      query: ()=> ({
        url: PRODUCTS_URL,
        method: "POST"
      }),
      invalidatesTags: ["Product"]  //not cached, obtain fresh data, so we don't need to refresh the page
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Products"]
    }),

  }),
});

export const {useGetAllProductsQuery, useGetProductQuery, 
  useCreateProductMutation, useUpdateProductMutation} = productsApiSlice;