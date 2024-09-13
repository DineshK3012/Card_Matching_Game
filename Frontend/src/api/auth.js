import axios from 'axios'
const base_url = import.meta.env.VITE_BASE_URL;

export const loadUser = async ()=>{
    return await axios.get(`${base_url}/api/users/me`,{
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    });
}

export const register = async (userData) => {
    return await axios.post(`${base_url}/api/users/register`, userData, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    });
};

export const login = async (userData) => {
    return await axios.post(`${base_url}/api/users/login`, userData, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    });
};

export const logout = async () => {
    return await axios.get(`${base_url}/api/users/logout`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    });
};