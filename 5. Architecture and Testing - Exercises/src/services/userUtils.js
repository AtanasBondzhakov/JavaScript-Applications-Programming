export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const setUser = (data) => localStorage.setItem('user', JSON.stringify(data));

export const clearUser = () => localStorage.removeItem('user');

export const hasOwner = (userId, ownerId) => userId === ownerId; 