// Importing the required libraries
import { createSlice } from "@reduxjs/toolkit";
//userSlice
const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
		},
		loginFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		registerStart: (state) => {
			state.isFetching = true;
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
		},
		registerFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		logoutStart: (state) => {
			state.isFetching = true;
		},
		logoutSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
		},
		logoutFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});
// Exporting
export const {
	loginStart,
	loginSuccess,
	loginFailure,
	registerStart,
	registerSuccess,
	registerFailure,
	logoutStart,
	logoutSuccess,
	logoutFailure,
} = userSlice.actions;
export default userSlice.reducer;
