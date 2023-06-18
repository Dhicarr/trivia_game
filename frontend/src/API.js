import axios from 'axios';

export default axios.create({
    baseURL: "https://ylrnj2e8zj.execute-api.us-east-1.amazonaws.com/dev/backend_api/leaderboard/",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})