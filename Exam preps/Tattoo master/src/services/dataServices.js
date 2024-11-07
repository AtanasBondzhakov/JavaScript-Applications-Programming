import * as api from '../services/api.js';

const endpoint = {
    getAll: '/data/tattoos?sortBy=_createdOn%20desc',
}

export const getAllTattoo = async () => await api.get(endpoint.getAll);