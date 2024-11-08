export const setUserData = (data) => localStorage.setItem('userData', JSON.stringify(data));

export const getUserData = () => JSON.parse(localStorage.getItem('userData'));

export const clearUserData = () => localStorage.removeItem('userData');

export const hasOwner = (userId, ownerId) => userId === ownerId;