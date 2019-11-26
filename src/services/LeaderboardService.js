import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default class LeaderboardService {
    constructor() {
        this._axios = axios.create({
            baseURL: `${apiUrl}/leaderboard`
        });
    }

    list() {
        return this._axios.get()
            .then(res => res.data)
            .catch(err => err);
    }

    save(record) {
        return this._axios.post('', record)
            .then(res => res.data)
    }
}