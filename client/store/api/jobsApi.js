import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/job`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: () => ({
                url: "/getAllJobs",
                method: "GET",
            }),
        }),
        searchJobs: builder.query({
            query: (params) => ({
                url: `/search`,
                method: "GET",
                params,
            }),
        }),
        getJobById: builder.query({
            query: (id) => `/${id}`,
        }),
    }),
});

export const { useGetAllJobsQuery, 
               useGetJobByIdQuery,
               useSearchJobsQuery
} = jobApi;

export default jobApi;
