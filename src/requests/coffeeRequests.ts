import axios from 'axios';
import { UsersCoffee } from '../types/types';

const getAllUsersCoffees = async (userId: string) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/coffee/${userId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addCoffee = async (userId: string, newCoffee: UsersCoffee) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/coffee/${userId}`,
      newCoffee
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateCoffee = async (coffeeId: number, updateCoffeeObj: any) => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/coffee/${coffeeId}`,
      updateCoffeeObj
    );
    return data;
  } catch (error) {
    console.log('error is in axios request', error);
  }
};

export { getAllUsersCoffees, addCoffee, updateCoffee };
