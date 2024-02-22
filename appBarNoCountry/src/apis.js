import axios from 'axios';

const API = 'http://192.168.1.4:8089/api/v1';

const apiRegister = async (name, userName, email, password) => {
  try {
    const response = await axios.post(`${API}/auth/sign-up`, {
      name: name,
      userName: userName,
      email: email,
      password: password,
    });

   //  console.log('Respuesta del servidor:', response.data);

    return response.data; // Devuelve los datos de respuesta del servidor si es necesario
  } catch (error) {
   //  console.error('Error al realizar la solicitud:', error);
    throw error; // Maneja el error según sea necesario en tu aplicación
  }
};

const apiLogin = async (userName, password) => {
  try {
    const response = await axios.post(`${API}/auth/login`, {
      userName: userName,
      password: password,
    });

   //  console.log('Respuesta del servidor:', response.data);

    return response.data; // Devuelve los datos de respuesta del servidor si es necesario
  } catch (error) {
   //  throw error; // Puedes manejar el error según sea necesario en tu aplicación
   //  console.log(error);
  }
};

module.exports = {
  apiRegister,
  apiLogin,
};
