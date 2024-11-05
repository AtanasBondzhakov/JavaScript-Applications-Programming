import { del, get, post } from "./requester.js"

const endpoints = {
    getAll: 'http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    idea: 'http://localhost:3030/data/ideas'
}

export const getAllIdeas = async () => await get(endpoints.getAll);

export const createIdea = async (title, description, img) => await post(endpoints.idea, {title, description, img});

export const getIdea = async (id) => await get(`${endpoints.idea}/${id}`); 

export const deleteIdea = async (id) => await del(`${endpoints.idea}/${id}`);