import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
	},
    reducers: {
        //GET ALL
		getAllUserStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getAllUserSuccess: (state, action) => {
			state.isFetching = false;
			state.products = action.payload;
		},
		getAllUserFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getAllUserStart,
	getAllUserSuccess,
	getAllUserFailure,
} = clientSlice.actions;

export default clientSlice.reducer;