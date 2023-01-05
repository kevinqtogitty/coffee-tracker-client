import axios from 'axios';
import { User } from 'firebase/auth';

const baseURL = 'https://localhost:3001';

const createUser = async (user: User) => {
  try {
    const { data } = await axios.post(`${baseURL}/user`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userId: number) => {
  try {
    const { data } = await axios.delete(`${baseURL}/user/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userId: number, type: string) => {
  try {
    const { data } = await axios.put(`${baseURL}/user/${userId}/${type}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { createUser, deleteUser, baseURL, updateUser };
