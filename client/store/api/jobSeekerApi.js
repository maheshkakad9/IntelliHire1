
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser,} from "../slice/jobSeekerSlice";

const apiSlice = createApi({
    reducerPath: "jobseekerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/users`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
       register: builder.mutation({
        query: (body) => ({
            url: "/register",
            method: "POST",
            body,
        }),
        onQueryStarted: async(arg, { dispatch, queryFulfilled }) => {
            try {
                const { data } = await queryFulfilled;
                dispatch(setUser(data?.data));
            } catch (error) {
                console.error("Error registering:", error);
            }
        },
       }),
       getProfile: builder.query({
        query: () => ({
            url: "/profile",
            method: "GET",
        }),
       }),
    }),
});

export const {
    useRegisterMutation,
    useGetProfileQuery,
} = apiSlice;

export default apiSlice;