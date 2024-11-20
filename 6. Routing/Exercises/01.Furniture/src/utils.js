export const getUserData = () => JSON.parse(localStorage.getItem('user'));

export const setUserData = (data) => localStorage.setItem('user', JSON.stringify(data));

export const clearUserData = () => localStorage.removeItem('user');

export const hasOwner = (userId, ownerId) => userId === ownerId;