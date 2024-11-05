import { get, post } from "./requester.js";
import { clearUser, setUser } from "./userUtils.js";

const endpoints = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout'
};

export const register = async (email, password) => {
    const user = await post(endpoints.register, { email, password });
    return setUser(user);
}

export const login = async (email, password) => {
    const user = await post(endpoints.login, { email, password });
    return setUser(user);
};

export const logout = async () => {
    const promise = await get(endpoints.logout);
    clearUser();
    await promise;
}