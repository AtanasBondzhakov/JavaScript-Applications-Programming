import * as api from './api.js';

const endpoints = {
    getAll: '/data/cyberpunk?sortBy=_createdOn%20desc',
    items: '/data/cyberpunk'
}

export const getAllItems = async () => await api.get(endpoints.getAll);

export const createItem = async (data) => await api.post(endpoints.items, data);