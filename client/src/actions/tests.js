import { FETCH_ALL, CREATE, DELETE } from "../constants/ACTION_TYPES";
import * as api from "../api/index.js";

export const getTests = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTests();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getTests_TEST = async () => {
    try {
        const { data } = await api.fetchTests();
        return data;
    } catch (error) {
        console.log(error.message);
        return undefined;
    }
};

export const createTest = (test) => async (dispatch) => {
    try {
        const { data } = await api.createTest(test);

        dispatch({ type: CREATE, payload: data });
        alert("上傳成功");
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteTest = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteTest(id);
        dispatch({ type: DELETE, payload: id });
        alert(data.message);
    } catch (error) {
        if (error?.response?.data) {
            alert(error.response.data);
        }
    }
};
