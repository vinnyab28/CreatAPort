import { createSlice } from "@reduxjs/toolkit";

export const experienceSlice = createSlice({
    name: "experience",
    initialState: [],
    reducers: {
        addExperience: (state, action) => {
            return [...state, action.payload];
        }
    }
});

export const {addExperience} = experienceSlice.actions;

export default experienceSlice.reducer;
