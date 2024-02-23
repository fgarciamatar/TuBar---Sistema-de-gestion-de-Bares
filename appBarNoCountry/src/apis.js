import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.7:8088/api/v1';

const EXEMPTED_ROUTES = ['/auth/sign-up', '/auth/login'];

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

api.interceptors.request.use(
  async (config) => {
    // Recupera el token de AsyncStorage
    const accessToken = await AsyncStorage.getItem('accessToken');

    // Verifica si la ruta actual está exonerada del token de autorización
    if (!EXEMPTED_ROUTES.includes(config.url)) {
      // Si hay un token y la ruta no está exonerada, agrega el encabezado de autorización con el token Bearer
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;