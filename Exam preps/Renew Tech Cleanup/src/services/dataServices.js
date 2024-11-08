import * as api from './api.js';

const endpoint = {
    getAll: '/data/solutions?sortBy=_createdOn%20desc',
    solutions: '/data/solutions'
}

export const getAllSolutions = async () => await api.get(endpoint.getAll);

export const createSolution = async (data) => await api.post(`${endpoint.solutions}`, data);

export const getSolutionById = async (id) => await api.get(`${endpoint.solutions}/${id}`);