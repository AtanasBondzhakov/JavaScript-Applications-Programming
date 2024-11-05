import { getUser } from './userUtils.js';

async function requester(method, url, data) {
    const userData = getUser();
    const option = {
        method,
        headers: {}
    };

    if (userData) {
        option.headers["X-Authorization"] = userData.accessToken;
    }

    if (data) {
        option.headers["Content-Type"] = "Application/json";
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, option);
        if (!response.ok) {
            if (response.status === 403) {
                userUtils.clear();
            }
            const error = await response.json();
            throw new Error(error.message);
        }
        if (response.status === 204) {
            return response;
        }
        return response.json();
    } catch (error) {
        alert(error);
    }

    return response.json();
}

export const get = async (url) => requester('GET', url);
export const post = async (url, data) => requester('POST', url, data);
export const put = async (url) => requester('PUT', url, data);
export const del = async (url) => requester('DELETE', url);