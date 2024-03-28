import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API = axios.create({baseURL : 'http://localhost:5000'})



API.interceptors.request.use((req) => {
    const gottoken = localStorage.getItem('user_token');
    if (gottoken) {
        req.headers.Authorization = `Bearer ${gottoken}`;
    }
    return req;
});

export const signInApi = (formData) => API.post('/user/signin',formData)

export const signUpAPi = (formData) => API.post('/user/signup',formData)

export const signInAdmin = (formData) => API.post('/user/signinadmin',formData)

export const getAdmin = (id) => API.get(`/admin/view/${id}`);

export const updateProfile = (id, formdata) => API.patch(`/admin/${id}/update`, formdata)

export const getUsers = () => API.get('/admin/users')

export const getUsersAll = () => API.get('/admin/usersall')

export const googleauth = (token) => API.post('/user/googlesign',token)