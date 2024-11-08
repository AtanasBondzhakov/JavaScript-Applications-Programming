import * as api from './api.js';

const endpoint = {
    getAll: '/data/solutions?sortBy=_createdOn%20desc'
}

export const getAllSolutions = async () => await api.get(endpoint.getAll);