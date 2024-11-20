import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: [],
    reducers: {
        addProject: (state, action) => {
            return [...state, action.payload];
        }
    }
});

export const {addProject} = projectSlice.actions;

export default projectSlice.reducer;
