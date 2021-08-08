import * as api from "../api/index.js";

export const getCodingProblems = async () => {
    try {
        const { data } = await api.fetchCodingProblems();
        return data;
    } catch (error) {
        console.log(error.message);
        return undefined;
    }
};
export const getCodingProblem = async (id) => {
    try {
        const { data } = await api.getCodingProblem(id);
        return data;
    } catch (error) {
        console.log(error.message);
        return undefined;
    }
};

export const createCodingProblem = async (codingProblem) => {
    try {
        const { data } = await api.createCodingProblem(codingProblem);
        alert("上傳成功");
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
};

export const deleteCodingProblem = async (id) => {
    try {
        const { data } = await api.deleteCodingProblem(id);
        console.log(data);
        alert("刪除成功");
        return data;
    } catch (error) {
        console.log(error);
        if (error?.response?.data) {
            alert(error.response.data);
        }
    }
};
