import { del, get, post, put } from "./api.js";

const endpoints = {
    getAll: '/data/facts?sortBy=_createdOn%20desc',
    facts: '/data/facts'
}

export const getAllFacts = async () => await get(endpoints.getAll);

 export const createFact = async (data) => await post(endpoints.facts, data);

 export const getFact = async (id) => await get(`${endpoints.facts}/${id}`);

 export const editFact = async (id, data) => await put(`${endpoints.facts}/${id}`, data);

 export const deleteFact = async (id) => await del(`${endpoints.facts}/${id}`);