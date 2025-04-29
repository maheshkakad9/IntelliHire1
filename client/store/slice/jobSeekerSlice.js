import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const jobSeekerSlice = createSlice({
    name: "jobseeker",
    initialState,
    reducers: {
        setUser: (state,action) => action.payload,
        logout: () => null,
    },
});

export const { setUser, logout } = jobSeekerSlice.actions;

export default jobSeekerSlice;