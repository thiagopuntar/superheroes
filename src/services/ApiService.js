import axios from 'axios';
import { addHour } from '../utils/date';
// TODO: Refactor this when the own api is done!!! The secret token SHOULD NOT be here.
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

class ApiService {
    constructor() {
        this._axios = axios.create({
            baseURL: `https://superheroapi.com/api/${accessToken}/`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
            }
        });
    }
    
    getAllChars() {
        return axios.get('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json')
            .then(res => res.data)
            .catch(err => {
                console.log('Não foi possível pegar os chars ', err);
            })
    }

    // Old stuff

    getChar(id) {
        return this._axios.get(`${id}/image`)
            .then(response => response.data)
            .catch(error => Promise.resolve({ response: 'error', id, error: error.response }));
    }

    getAllCharsOld(progressFn) {
        const idsLength = 731; // Actual max number of characters at api

        return new Promise(async (resolve, reject) => {
            const chars = this._getCharsFromLocalStorage();
            if (chars) 
                return chars;

            try {
                const results = [];
                const batchSize = 10;

                for (let i = 1; i <= idsLength; i += (batchSize + 1)) {
                    if (progressFn) {
                        const percentage = parseInt((i / idsLength) * 100, 10);
                        progressFn(percentage); // Update progress externally.
                    }

                    const batchResult = await this._getCharsInBatch(i, batchSize);
                    results.push(...batchResult);
                }
                
                this._setCharsToLocalStorage(results);
                resolve(results);

            } catch (error) {
                reject(error);
            }
        });
    }

    _getCharsFromLocalStorage() {
        const chars = window.localStorage.getItem('chars');

        if (!chars) return null;

        const parsedChars = JSON.parse(chars);
        if (parsedChars.expireDate > new Date()) {
            return parsedChars.chars;
        } else {
            return null;
        }
    }

    _setCharsToLocalStorage(chars) {
        const expireDate = addHour(new Date(), 2);

        const objToPersist = {
            chars,
            expireDate
        }

        window.localStorage.setItem('chars', JSON.stringify(objToPersist));
    }
    
    async _getCharsInBatch(initialId, batchSize) {

        return new Promise((resolve, reject) => {
            const promises = [];

            for (let i = initialId; i <= (initialId + batchSize); i++) {
                const promise = this.getChar(i);
                promises.push(promise);
            }

            Promise.all(promises)
                .then(chars => resolve(chars))
                .catch(error => reject(error));
        });
    }
    
}

export default ApiService;