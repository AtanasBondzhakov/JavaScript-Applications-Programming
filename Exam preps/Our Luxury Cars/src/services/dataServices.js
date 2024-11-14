import * as api from './api.js'

const endpoints = {
    getAll: '/data/cars?sortBy=_createdOn%20desc',
}

export const getAllCars = async () => await api.get(endpoints.getAll);