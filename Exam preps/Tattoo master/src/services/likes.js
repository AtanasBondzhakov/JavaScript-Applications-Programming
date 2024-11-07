import * as api from '../services/api.js';

const endpoint = {
    like: '/data/likes',
    getTotalLikesById: (tattooId) => `/data/likes?where=tattooId%3D%22${tattooId}%22&distinct=_ownerId&count`,
    getLikesByUser: (tattooId, userId) => `/data/likes?where=tattooId%3D%22${tattooId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export const likeTattoo = async (data) => await api.post(endpoint.like, data);

export const getTotalLikesPerTattoo = async (id) => await api.get(endpoint.getTotalLikesById(id));

export const getLikesByUser = async (tattooId, userId) => await api.get(endpoint.getLikesByUser(tattooId, userId));