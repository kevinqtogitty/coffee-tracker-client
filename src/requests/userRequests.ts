import axios from 'axios';
import { User } from '../types/types';

const createUser = async (user: User) => {
  console.log('axios');
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user`,
      user
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userId: number) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/user/${userId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (
  userId: number,
  type: string,
  email?: string,
  firstName?: string,
  lastName?: string
) => {
  let dataToChange;
  switch (type) {
    case 'email':
      dataToChange = email;
      break;
    case 'firstName':
      dataToChange = firstName;
      break;
    case 'lastName':
      dataToChange = lastName;
      break;
  }
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/${userId}/${type}`,
      dataToChange
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { createUser, deleteUser, updateUser };
