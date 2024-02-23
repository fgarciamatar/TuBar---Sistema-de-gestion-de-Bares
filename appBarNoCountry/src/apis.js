import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.7:8088/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpApi = async (userData) => {
  try {
    const response = await api.post('/auth/sign-up', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiLogin = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);

   //  console.log('Respuesta del servidor:', response.data);

    return response.data; // Devuelve los datos de respuesta del servidor si es necesario
  } catch (error) {
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
   //  console.log(error);
  }
};

export default api;