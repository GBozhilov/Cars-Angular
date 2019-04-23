const baseUrl = 'http://localhost:5000';
const userUrl = `${baseUrl}/user`;
const carUrl = `${baseUrl}/car`;
const rentUrl = `${baseUrl}/rent`;

export const registerUrl = `${userUrl}/register`;
export const loginUrl = `${userUrl}/login`;
export const getCurrentUserUrl = `${userUrl}/me`;

export const createCarUrl = `${carUrl}/create`;
export const editCarUrl = (carId) => `${carUrl}/edit/${carId}`;
export const deleteCarUrl = (carId) => `${carUrl}/delete/${carId}`;
export const getDetailsCarUrl = (carId) => `${carUrl}/details/${carId}`;
export const getAllCarUrl = `${carUrl}/all`;

export const createRentUrl = (carId) => `${rentUrl}/create/${carId}`;
export const deleteRentUrl = (rentId) => `${rentUrl}/delete/${rentId}`;
export const getMineRentUrl = `${rentUrl}/mine`;
