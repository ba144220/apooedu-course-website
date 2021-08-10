import * as api from "../api/index.js";

export const getUsers = async (id, codeData) => {
    try {
        const { data } = await api.fetchUsers(id, codeData);
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};

export const deleteUser = async (user_id) => {
    try {
        const { data } = await api.deleteUser(user_id);
        alert("成功刪除使用者");
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};

export const upgradeUser = async (user_id) => {
    try {
        const { data } = await api.upgradeUser(user_id);
        alert("成功升級使用者為管理員");
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};

export const downgradeUser = async (user_id) => {
    try {
        const { data } = await api.downgradeUser(user_id);
        alert("成功降級使用者");
        return data;
    } catch (error) {
        if (error?.response?.data?.message) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
};
