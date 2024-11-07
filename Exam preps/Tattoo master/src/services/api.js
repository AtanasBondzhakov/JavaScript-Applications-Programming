//TODO import from correct path
import { clearUserData, getUserData } from "../util.js"

const host = 'http://localhost:3030';

const request = async (method, url, data) => {
    const option = {
        method,
        headers: {}
    }

    const userData = getUserData();
    if(userData) {
        option.headers['X-Authorization'] = userData.accessToken;
    }

    if (data !== undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, option);
        if(!response.ok) {
            const error = await response.json();
            if (response.status === 403 && error.message === 'Invalid access token') {
                clearUserData();
            }
            throw new Error(error.message);
        }

        if(response.status === 204) {
            return response;
        }

        return response.json();
    } catch (error) {
        alert(error);
        throw error;
    }
}

export const get = (url) => request('GET', url);
export const post = (url, data) => request('POST', url, data);
export const put = (url, data) =>  request('PUT', url, data);
export const del = (url) => request('DELETE', url);