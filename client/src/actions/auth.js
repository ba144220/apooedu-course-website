// import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = async (formData, history) => {
    try {
        // login the user
        const { data } = await api.signIn(formData);
        localStorage.setItem("profile", JSON.stringify(data));

        //dispatch({ type: AUTH, data });
        history.push("/leaderboard");
        return data;
    } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
            return error.response.data.message;
        }
    }
};
export const signup = async (formData, history) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);

        //dispatch({ type: AUTH, data });
        history.push("/leaderboard");
        localStorage.setItem("profile", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);

        if (error?.response?.data?.message) {
            alert(error.response.data.message);
            return error.response.data.message;
        }
    }
};
