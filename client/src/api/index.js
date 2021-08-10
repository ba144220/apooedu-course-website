import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const fetchCodingProblems = () => API.get("/coding-problem");
export const getCodingProblem = (id) => API.get(`/coding-problem/${id}`);
export const createCodingProblem = (newCodingProblem) =>
    API.post("/coding-problem", newCodingProblem);
export const deleteCodingProblem = (id) => API.delete(`/coding-problem/${id}`);
export const updateCodingProblem = (id, updatedProb) =>
    API.patch(`/coding-problem/${id}`, updatedProb);

export const postSubmission = (id, codeData) => API.post(`/submission/${id}`, codeData);
export const getSubmissions = (prob_id) => API.get(`/submission/${prob_id}`);
export const deleteSubmission = (sub_id) => API.delete(`/submission/${sub_id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
