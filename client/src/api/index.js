import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const fetchCodingProblems = () => API.get("/coding-problems");
export const getCodingProblem = (id) => API.get(`/coding-problems/${id}`);
export const createCodingProblem = (newCodingProblem) =>
    API.post("/coding-problems", newCodingProblem);
export const deleteCodingProblem = (id) => API.delete(`/coding-problems/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
