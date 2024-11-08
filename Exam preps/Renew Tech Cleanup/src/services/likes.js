import * as api from '../services/api.js';

const endpoint = {
    like: '/data/likes',
    totalLikesPerSolution: (solutionId) => `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`,
    likesPerUser: (solutionId, userId) => `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export const likeSolution = async (data) => await api.post(endpoint.like, data);

export const getAllLikesPerSolution = async (id) => await api.get(endpoint.totalLikesPerSolution(id));

export const getLikesPerUser = async (solutionId, userId) => await api.get(endpoint.likesPerUser(solutionId, userId));