// features/role/services/roleService.js
import axios from '../../../api/axios';

export const createRole = (data) => {
    return axios.post("/roles", data);
};

export const getRoles = () => {
    return axios.get("/roles");
};