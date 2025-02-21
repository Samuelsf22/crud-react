import { api } from "@/api/api";
import { User } from "@/models/User";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (public_id: string) => ({
        url: `user?public_id=${public_id}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation({
      query: ({ public_id, user }: { public_id: string; user: User }) => ({
        url: `user?public_id=${public_id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (public_id: string) => ({
        url: `user?public_id=${public_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
