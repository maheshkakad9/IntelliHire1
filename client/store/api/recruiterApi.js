import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const recruiterApi = createApi({
    reducerPath: "recruiterApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/recruiter`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getRecruiterProfile: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetRecruiterProfileQuery
} = recruiterApi;

export default recruiterApi;