import axios from 'axios'
const base_url = import.meta.env.VITE_BASE_URL;

export const getPastScores = async ()=>{
    return await axios.get(`${base_url}/api/users/scores`,{
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    });
}

export const getLeaderboard = async () => {
    return await axios.get(`${base_url}/api/users/leaderboard`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    });
};

export const updateUserScore = async (userData) => {
    return await axios.post(`${base_url}/api/users/update_score`, userData, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        }
    });
};