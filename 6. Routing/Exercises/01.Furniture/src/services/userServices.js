import { clearUserData, setUserData } from "../utils.js";
import { get, post } from "./api.js";

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export const login = async (email, password) => {
    const user = await post(endpoints.login, { email, password });
    return setUserData(user);
}

export const register = async (email, password) => {
    const user =  await post(endpoints.register, {email, password});
    return setUserData(user);
}

export const onLogout = async (ctx) => {
    const promise = await get(endpoints.logout);
    clearUserData();
    await promise;
    ctx.page.redirect('/');
}