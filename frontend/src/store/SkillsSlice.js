import { createSlice } from "@reduxjs/toolkit";

export const skillsSlice = createSlice({
	name: "skills",
	initialState: [],
	reducers: {
		addSkills: (state, action) => {
			return [...action.payload];
		},
	},
});

export const { addSkills } = skillsSlice.actions;

export default skillsSlice.reducer;
