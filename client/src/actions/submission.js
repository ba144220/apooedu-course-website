import * as api from "../api/index.js";

export const postSubmission = async (id, codeData) => {
    try {
        const { data } = await api.postSubmission(id, codeData);
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};

export const getSubmissions = async (prob_id) => {
    try {
        const { data } = await api.getSubmissions(prob_id);
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};

export const deleteSubmission = async (sub_id) => {
    try {
        const { data } = await api.deleteSubmission(sub_id);
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};
