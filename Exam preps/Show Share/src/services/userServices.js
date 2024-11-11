import { clearUserData, setUserData } from '../utils.js';
import * as api from './api.js';

const endpoint = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export const login = async (email, password) => {
    const user = await api.post(endpoint.login, { email, password });
    setUserData(user);
}

export const register = async (email, password) => {
    const user = await api.post(endpoint.register, { email, password });
    setUserData(user);
}

export const onLogout = async (ctx) => {
    const promise = await api.get(endpoint.logout);
    clearUserData();
    await promise;
    ctx.page.redirect('/');
}