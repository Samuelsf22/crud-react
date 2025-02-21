import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
