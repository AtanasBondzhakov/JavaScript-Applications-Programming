import { del, get, post, put } from "./api.js";

const endpoints = {
    getAll: '/data/characters?sortBy=_createdOn%20desc',
    characters: '/data/characters'
}

export const getAllCharacters = () => get(endpoints.getAll);

export const createCharacter = (data) => post(endpoints.characters, data);

export const getCharacterById = (id) => get(`${endpoints.characters}/${id}`);

export const deleteCharacter = (id) => del(`${endpoints.characters}/${id}`);

export const editCharacter = (id, data) => put(`${endpoints.characters}/${id}`, data);