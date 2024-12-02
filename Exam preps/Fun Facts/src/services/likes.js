import { get, post } from "./api.js";

const endpoints = {
    like: '/data/likes',
    likesPerFact: (factId) => `/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    likesForUser: (factId, userId) => `/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export const like = async (factId) => await post(endpoints.like, { factId });

export const getTotalLikes = async (factId) => await get(endpoints.likesPerFact(factId));

export const isLiked = async (factId, userId) => await get(endpoints.likesForUser(factId, userId));