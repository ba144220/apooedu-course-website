// import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = async (formData, history) => {
    try {
        // login the user
        const { data } = await api.signIn(formData);
        localStorage.setItem("profile", JSON.stringify(data));

        //dispatch({ type: AUTH, data });
        history.push("/explore-courses");

        return data;
    } catch (error) {
        if (error?.response?.data) {
            //console.log(error.response.data);
            //alert(error.response.data.message);
            return error.response.data;
        }
    }
};
export const signup = async (formData, history, callback) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);

        //dispatch({ type: AUTH, data });
        //localStorage.setItem("profile", JSON.stringify(data));

        //history.push("/auth");
        callback();
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};
