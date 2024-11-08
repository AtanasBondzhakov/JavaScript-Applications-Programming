import { get, post } from './api.js';
import { clearUserData, setUserData } from '../utils.js';

const endpoint = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'
}

export const register = async (data) => {
    const userData = await post(endpoint.register, data);
    setUserData(userData);
}

export const login = async (data) => {
    const userData = await post(endpoint.login, data);
    setUserData(userData);
}

export const onLogout = async (ctx) => {
    const promise = await get(endpoint.logout);
    clearUserData();
    await promise;
    ctx.page.redirect('/');
} 