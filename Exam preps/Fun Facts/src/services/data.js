import { get } from "./api.js";

const endpoints = {
    getAll: '/data/facts?sortBy=_createdOn%20desc'
}

export const getAllFacts = async () => await get(endpoints.getAll);