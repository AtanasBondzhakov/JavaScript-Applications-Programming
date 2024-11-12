import * as api from '../services/api.js';

const endpoint = {
    getAll: '/data/shows?sortBy=_createdOn%20desc',
    shows: '/data/shows',
    search: (query) => `/data/shows?where=title%20LIKE%20%22${query}%22`
}

export const getAllShows = async () => await api.get(endpoint.getAll);

export const createShow = async (data) => await api.post(endpoint.shows, data);

export const getShowById = async (id) => await api.get(`${endpoint.shows}/${id}`);

export const editShow = async (id, data) => await api.put(`${endpoint.shows}/${id}`, data); 

export const deleteShow = async (id) => await api.del(`${endpoint.shows}/${id}`);

export const searchShow = async (query) => await api.get(endpoint.search(query));