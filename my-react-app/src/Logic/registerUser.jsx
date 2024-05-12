import axios from 'axios';

const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default registerUser;
