import * as api from '../services/api.js';

const endpoint = {
    getAll: '/data/shows?sortBy=_createdOn%20desc',
    shows: '/data/shows',
}

export const getAllShows = async () => await api.get(endpoint.getAll);

export const createShow = async (data) => await api.post(endpoint.shows, data);