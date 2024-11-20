import { del, get, post, put } from "./api.js";

const baseUrl = '/data/catalog';

const myFurniture = (userId) => `?where=_ownerId%3D%22${userId}%22` ;

export const getAllItems = async () => await get(baseUrl);

export const createItem = async (data) => await post(baseUrl, data);

export const getItemById = async (id) => await get(`${baseUrl}/${id}`);

export const editItem = async (id, data) => await put(`${baseUrl}/${id}`, data);

export const deleteItem = async (id) => await del(`${baseUrl}/${id}`);

export const getMyItems = async (userId) => await get(`${baseUrl}${myFurniture(userId)}`);