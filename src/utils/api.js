import axios from "axios";

let api = null;

//created only when a user login
export const createApi = (token) => {
    api = axios.create({baseURL : import.meta.env.VITE_BACKEND_URL})
    api.interceptors.request.use((config) => {
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config

    })
    return api
}

//uses every time when the client communicates to backend
export const getApi = () => {
    if (!api){
        throw new Error("api not initialized. call createApi token after login")
    }
    return api
};


// deleted as soon as a user logged out
export const deleteApi = () => {
    return api = null
};
