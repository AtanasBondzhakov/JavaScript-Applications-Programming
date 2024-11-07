import * as api from '../services/api.js';

const endpoint = {
    getAll: '/data/tattoos?sortBy=_createdOn%20desc',
    tattoos: '/data/tattoos'
}

export const getAllTattoo = async () => await api.get(endpoint.getAll);

export const createTattoo = async (data) => await api.post(endpoint.tattoos, data);

export const getTattooById = async (id) => await api.get(`${endpoint.tattoos}/${id}`);