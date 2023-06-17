import axios from 'axios';

export default axios.create({
    baseURL: "https://184.73.130.143:8000/backend_api/leaderboard",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})