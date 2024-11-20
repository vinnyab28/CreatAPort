import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        firstName: "",
        lastName: "",
        title: "",
        summary: "",
        profilePic: "",
        links: []
    },
    reducers: {
        updateProfile: (state, action) => {
            return {...state, ...action.payload};
        }, 
    }
});

export const {updateProfile} = profileSlice.actions;

export default profileSlice.reducer;