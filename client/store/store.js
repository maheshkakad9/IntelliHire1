import { configureStore } from "@reduxjs/toolkit";
import jobSeekerReducer from "./slice/jobSeekerSlice";
import  apiSlice  from "../store/api/jobSeekerApi";
import jobApi from "./api/jobsApi";
import recruiterApi from "./api/recruiterApi";
const store = configureStore({
    reducer: {
        jobseeker: jobSeekerReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [jobApi.reducerPath] : jobApi.reducer,
        [recruiterApi.reducerPath] : recruiterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, jobApi.middleware, recruiterApi.middleware),
});

export default store;