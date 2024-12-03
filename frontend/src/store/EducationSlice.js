import { createSlice } from "@reduxjs/toolkit";

export const educationSlice = createSlice({
	name: "education",
	initialState: [],
	reducers: {
		addEducation: (state, action) => {
			return [...state, ...action.payload];
		},
	},
});

export const { addEducation } = educationSlice.actions;

export default educationSlice.reducer;
