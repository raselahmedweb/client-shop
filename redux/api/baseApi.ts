import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.208.241:5000/api/v1",
    prepareHeaders: async (headers) => {
      // Mobile token
      const token = await SecureStore.getItemAsync("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (params) => ({
        url: `/user/all-users`,
        method: "GET",
        params,
      }),

      providesTags: ["User"],
    }),
    getMe: builder.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),

      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    createUser: builder.mutation({
      query: (UserData) => ({
        url: `/user/register`,
        method: "POST",
        body: UserData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        credentials: "include",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (UserData) => ({
        url: `/user/${UserData._id}`,
        method: "PATCH",
        body: UserData,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserByAdmin: builder.mutation({
      query: (UserData) => ({
        url: `/user/by-admin/${UserData._id}`,
        method: "PATCH",
        body: UserData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetMeQuery,
  useLogoutMutation,
  useCreateUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserByAdminMutation,
} = baseApi;
