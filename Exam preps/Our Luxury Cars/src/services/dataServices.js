import * as api from './api.js'

const endpoints = {
    getAll: '/data/cars?sortBy=_createdOn%20desc',
    cars: '/data/cars',
    search: (query) => `/data/cars?where=model%20LIKE%20%22${query}%22`
}

export const getAllCars = async () => await api.get(endpoints.getAll);

export const addCar = async (data) => await api.post(endpoints.cars, data);

export const getCarById = async (id) => await api.get(`${endpoints.cars}/${id}`);

export const editCar = async (id, data) => await api.put(`${endpoints.cars}/${id}`, data);

export const deleteCar = async (id) => await api.del(`${endpoints.cars}/${id}`);

export const searchCar = async (query) => await api.get(endpoints.search(query));