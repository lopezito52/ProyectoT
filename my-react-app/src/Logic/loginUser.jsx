import axios from 'axios';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/users/login', { // Corrige la URL de la solicitud
      email: email,
      password: password
    });
    return response.data; // Devuelve la respuesta del servidor, por ejemplo, 'Success' o 'Not allowed'
  } catch (error) {
    console.error('Error:', error);
    throw error; // Manejo de errores
  }
}

export default loginUser;
