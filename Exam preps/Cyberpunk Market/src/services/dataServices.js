import * as api from './api.js';

const endpoints = {
    getAll: '/data/cyberpunk?sortBy=_createdOn%20desc',
    items: '/data/cyberpunk'
}

export const getAllItems = async () => await api.get(endpoints.getAll);

export const createItem = async (data) => await api.post(endpoints.items, data);

export const getItemById = async (id) => await api.get(`${endpoints.items}/${id}`);

export const editItem = async (id, data) => await api.put(`${endpoints.items}/${id}`, data);

export const deleteItem = async (id) => await api.del(`${endpoints.items}/${id}`);