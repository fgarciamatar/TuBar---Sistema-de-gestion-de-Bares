const axios = require("axios");

const API = "http://localhost:8089";


const apiRegister = async (name, username, email, password) => {
    try {
       const response = await axios.post(`${API}/register`, {
          name: name,
          username: username,
          email: email,
          password: password
       });
       
       console.log("Respuesta del servidor:", response.data);
       
       return response.data; // Devuelve los datos de respuesta del servidor si es necesario
    } catch (error) {
       console.error("Error al realizar la solicitud:", error);
       throw error; // Puedes manejar el error según sea necesario en tu aplicación
    }
 };

module.exports = {
    apiRegister
}