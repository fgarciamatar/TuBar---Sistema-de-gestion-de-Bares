import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { urlApi } from './utils/definition';

<<<<<<< HEAD
const API_BASE_URL = 'http://192.168.1.4:8088/api/v1';
=======
const API_BASE_URL = urlApi;
>>>>>>> develop

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
  console.log("USERDATA",userData);
  try {
    const response = await api.post('/auth/login', userData);

    //  console.log('Respuesta del servidor:', response.data);

    return response.data; 
  } catch (error) {
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
   //  console.log(error);
  }
};

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (!EXEMPTED_ROUTES.includes(config.url)) {
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

export const postLoginProfile = async (pin, idProfile) => {

    const token = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.post(`${urlApi}/auth/login/profile`,{
        pinCode: pin,
        profileId: idProfile
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newToken = response.data.token;
<<<<<<< HEAD
      AsyncStorage.setItem('accessToken', newToken);
=======
      AsyncStorage.setItem('accessTokenProfile', newToken);
>>>>>>> develop

      console.log("response",response.data);
      return response.data;
    } catch (error) {
      
      return {status: false}
    }
  
};


export default api;