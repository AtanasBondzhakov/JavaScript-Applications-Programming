import { get, post } from "./api.js";

const endpoints = {
    like: '/data/useful',
    likesPerCharacter: (characterId) => `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`,
    likesForUser: (characterId, userId) => `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export const like = async (data) => await post(endpoints.like, data);

export const getTotalLikes = async (characterId) => await get(endpoints.likesPerCharacter(characterId));

export const isLiked = async (characterId, userId) => await get(endpoints.likesForUser(characterId, userId));