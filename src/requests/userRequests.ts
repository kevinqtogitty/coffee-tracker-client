import axios from 'axios';
import { User } from '../types/types';
import {
  updatePassword,
  updateEmail,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

const createUser = async (user: User) => {
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

const getCurrentUserData = async (userId: string) => {
  console.log('in request');
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/${userId}`
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
  userUpdateInfo: User
) => {
  try {
    if (type === 'email' || type === 'firstName' || type === 'lastName') {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/${userId}`,
        userUpdateInfo
      );
      if (type === 'email')
        await updateEmail(auth.currentUser!, userUpdateInfo.email);
      return data;
    } else if (type === 'password') {
      await updatePassword(auth.currentUser!, userUpdateInfo.password!);
    } else if (type === 'forgotPassword') {
      await sendPasswordResetEmail(auth, userUpdateInfo.email);
    }
  } catch (error) {
    console.log(error);
  }
};
export { createUser, deleteUser, updateUser, getCurrentUserData };
