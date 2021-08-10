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
