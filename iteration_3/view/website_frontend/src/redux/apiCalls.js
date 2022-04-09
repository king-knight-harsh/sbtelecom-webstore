import {
	loginFailure,
	loginStart,
	loginSuccess,
	registerStart,
	registerSuccess,
	registerFailure,
	logoutStart,
	logoutSuccess,
	logoutFailure
} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const register = async (dispatch, user) => {
	dispatch(registerStart());
	try {
		const res = await publicRequest.post("/auth/register", user);
		dispatch(registerSuccess(res.data));
	} catch (err) {
		dispatch(registerFailure());
	}
};

export const logout = async (dispatch) => {
	dispatch(logoutStart());
	try {
		const res = await publicRequest.get("/auth/logout");
		dispatch(logoutSuccess(res.data));
	} catch (err) {
		dispatch(logoutFailure());
	}
};