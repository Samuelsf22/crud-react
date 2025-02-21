import { api } from "@/api/api";
import { Login, User, JwtToken } from "@/models/User";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<JwtToken, Login>({
      query: (login: Login) => ({
        url: "/auth/login",
        method: "POST",
        body: login,
      }),
      transformResponse: (response: { token: string }): JwtToken => ({
        token: response.token
      }),
    }),

    createUser: builder.mutation<JwtToken, User>({
      query: (user: User) => ({
        url: "/auth/create",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: { token: string }): JwtToken => ({
        token: response.token
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useCreateUserMutation } = authApi;
