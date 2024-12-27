import { del, get, post, put } from "./api.js"

const endpoints = {
    getAll: '/data/drones?sortBy=_createdOn%20desc',
    drones: '/data/drones'
}

export const getAllDrones = async () => await get(endpoints.getAll);

export const createDrone = async (data) => await post(endpoints.drones, data);

export const getDrone = async (id) => await get(`${endpoints.drones}/${id}`);

export const editDrone = async (id, data) => await put(`${endpoints.drones}/${id}`, data);

export const deleteDrone = async (id) => await del(`${endpoints.drones}/${id}`);